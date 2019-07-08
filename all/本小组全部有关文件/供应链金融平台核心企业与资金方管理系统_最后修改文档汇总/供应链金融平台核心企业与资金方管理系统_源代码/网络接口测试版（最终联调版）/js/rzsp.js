// js for 资金方融资审批
var rzsp_data=null;
var tokenid = localStorage.getItem("token");
var email = localStorage.getItem("email");

function setContent(all) {
    console.log(all);
    document.getElementById("truetime").innerHTML = all.createTime.substring(0,10);
    document.getElementById("gys_name_content").innerHTML = all.Supplier.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.additional.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.additional.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.additional.person;
    document.getElementById("gys_credit_content").innerHTML = all.Supplier.additional.trust;
    document.getElementById("gys_crenum_content").innerHTML = all.Supplier.additional.trust_money;
    document.getElementById("gys_hxqy_name_content").innerHTML = all.CoreBusiness.name;
}
function showDetail(e){
    document.getElementById("bg").style.display = "block";
    setContent(e);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
function TableAddLine(st,rowIndex){

    var strs = st.split(",");
    var table = document.getElementById("C_Table");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cols = getTableColunms();
    var i=0;
    for (i=0;i<cols-1;i++){
        var cell = row.insertCell(i);
        cell.innerHTML=strs[i];
    }
    var cell=row.insertCell(cols-1);
    var Buttonnames = getButtonList().split(",");
    var blen = Buttonnames.length;
    for (i=0;i<blen;i++){
        //var bhref = getButtonLink(i,st);
       //var tempstr = "<a onclick=" + getButtonFunction(i,rowIndex)+">"+Buttonnames[i]+"</a>";
	   var tempstr = "<a onclick=\"getButtonFunction(this.type)\""+" type="+"\""+i+" "+rowIndex+"\""+" style=\"cursor:pointer;\">"+Buttonnames[i]+"</a>";
        cell.innerHTML += tempstr;
		if (i!=blen-1) cell.innerHTML+="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		
    }
}
function TableAddHead(){
	document.getElementById("C_Table").innerHTML="<tr><th>供&nbsp&nbsp应&nbsp&nbsp商&nbsp&nbsp名&nbsp&nbsp称&nbsp&nbsp</th><th>&nbsp证&nbsp&nbsp件&nbsp&nbsp类&nbsp&nbsp型&nbsp</th><th>&nbsp证&nbsp&nbsp件&nbsp&nbsp号&nbsp&nbsp码</th>	<th>法&nbsp&nbsp人&nbsp&nbsp姓&nbsp&nbsp名</th><th>&nbsp&nbsp提&nbsp&nbsp交&nbsp&nbsp时&nbsp&nbsp间&nbsp&nbsp</th><th>&nbsp&nbsp操&nbsp&nbsp&nbsp&nbsp作</th></tr>";
}
function rzsp_JSONtoString(data){
	var mystring="";

	var len = data.data.length;

	for (i=0;i<len;i++){
        var user = data.data[i].Supplier;
        mystring += user.name + "," + user.additional.type + "," + user.additional.num + ","+ user.additional.person + "," + data.data[i].createTime.substring(0,10);
		if (i!=len-1) mystring+="\n";
	}

	return mystring;
	
}

function getTableHead(){
    return "供应商名称,证件类型,证件号码,法人姓名,提交时间,操作";
}
function getTableColunms(){
    return getTableHead().split(",").length;
}
function getButtonList(){
    // return "授信审批,通过,驳回,啦啦啦";
    return "[通过],[驳回],[查看详情]";
}
function getButtonFunction(data){
	var strs = data.split(" ");
	var buttonIndex = parseInt(strs[0]);
	var rowIndex = parseInt(strs[1]);
    if (buttonIndex==0){
        //通过按钮
        var settings = {
            "url": "http://114.115.240.16/api/financing/pay",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "token": tokenid
            },
            "data": "{\n\t\"id\":"+rzsp_data.data[rowIndex].id+"\n}",
        };
        $.ajax(settings).done(function (response) {
            alert("融资审批通过结果："+response.msg);
            location.reload();
        });
        return;
	}
	if (buttonIndex==1){
        //驳回按钮
        var settings = {
            "url": "http://114.115.240.16/api/financing/reject",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "token": tokenid
            },
            "data": "{\n\t\"id\":"+rzsp_data.data[rowIndex].id+"\n}",
        };
        $.ajax(settings).done(function (response) {
            alert("融资审批驳回结果："+response.msg);
            location.reload();
        });
        return;
	}
	if (buttonIndex==2){
		//查看详情按钮
		//wyx's code 行数是rowIndex 对象是rzsp_data.adopt[rowIndex]
		// rzsp_data.adopt[rowIndex].Supplier.user.name="sb";//ztw_test
		showDetail(rzsp_data.data[rowIndex]);
		return;
	}
}
function changeZjfName(){
    var settings = {
        "url": "http://114.115.240.16/api/user/getUserByEmail",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": "{\n\t\"email\":"+email+"\n}",
    };
    $.ajax(settings).done(function (data) {
        document.getElementById("zjf_name").innerHTML=data.data.name;
        rzsp_data = data;
    });
}
function clearTable(){
	document.getElementById("C_Table").innerHTML="";
}
function getRzsp_data(){
    var settings = {
        "url": "http://114.115.240.16/api/financing/getFinancingByUserAndStatus",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"status\":\"2\"\n}",
    };
    $.ajax(settings).done(function (data) {
        console.log(data);
        rzsp_data=data;
        clearTable();
        TableAddHead();
        var strs = rzsp_JSONtoString(rzsp_data).split("\n");
        var len = strs.length;
        var i=0;
        if(rzsp_data.data.length ==0){
            return ;
        }
        for (i=0;i<len;i++){
            if(rzsp_data.data[i].status!=null){
                if (rzsp_data.data[i].status==2) TableAddLine(strs[i],i);
            }
        }
    });
}

window.onload=function init(){
	changeZjfName();
	getRzsp_data();

};
