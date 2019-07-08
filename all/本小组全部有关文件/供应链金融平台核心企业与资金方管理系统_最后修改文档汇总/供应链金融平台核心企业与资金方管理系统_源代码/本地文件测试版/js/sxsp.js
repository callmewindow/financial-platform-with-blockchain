var sxsp_data=null;
function setContent(all) {
    console.log(all);
    document.getElementById("truetime").innerHTML = all.adopt_time;
    document.getElementById("gys_name_content").innerHTML = all.Supplier.user.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.user.profile.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.user.profile.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.user.profile.person;
    document.getElementById("gys_credit_content").innerHTML = all.Supplier.user.profile.trust;
    document.getElementById("gys_crenum_content").innerHTML = all.Supplier.user.profile.trust_money;
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
	/*
    row.onclick=function(){
        editDetail(st);
        showDetail();
		
    }
	*/
}
function TableAddHead(){
	/*
    var strs = getTableHead().split(",");
    var table = document.getElementById("C_Table");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cols = getTableColunms();
    var i=0;
    for (i=0;i<=cols-1;i++){
        var cell = row.insertCell(i);
        cell.innerHTML=strs[i];
    }
	*/
	document.getElementById("C_Table").innerHTML="<tr><th>供应商名称</th><th>证件类型</th><th>证件号码</th>	<th>法人姓名</th><th>提交时间</th><th>操作</th></tr>";
}
function sxsp_JSONtoString(data){
	var mystring="";


	var len = data.adopt.length;

	for (i=0;i<len;i++){
		var user = data.adopt[i].Supplier.user;
		mystring += user.name + "," + user.profile.type + "," + user.profile.num + ","+ user.profile.person + "," + data.adopt[i].adopt_time;
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
		sxsp_data.adopt[rowIndex].status +=1;
		//sxsp_data.adopt[rowIndex].Supplier.user.name="sb";
		refreshTable();
        alert("已通过");
		return;
	}
	if (buttonIndex==1){
		//驳回按钮
		sxsp_data.adopt[rowIndex].status=-1;
		refreshTable();
        alert("已驳回");
		return;
	}
	if (buttonIndex==2){
		//查看详情按钮
		//wyx's code 行数是rowIndex 对象是sxsp_data.adopt[rowIndex]
		// sxsp_data.adopt[rowIndex].Supplier.user.name="sb";//ztw_test
		showDetail(sxsp_data.adopt[rowIndex]);
		return;
	}
	
	
}
function changeZjfName(zjfDataUrl){
	$.ajax({
                    url: zjfDataUrl,
                    async: false,
					dataType: 'JSON',
                    success: function (data){
                        document.getElementById("zjf_name").innerHTML=data.user.name;
						
                    }
                });
}
function clearTable(){
	document.getElementById("C_Table").innerHTML="";
}
function getSxsp_data(tableInfoUrl){
	$.ajax({
                    url: tableInfoUrl,
                    async: false,
					dataType: 'JSON',
                    success: function (data){
                        sxsp_data=data;	
						//console.log(data.adopt.length);
                    }
                });
}
function refreshTable(){
	clearTable();
	TableAddHead();
	var strs = sxsp_JSONtoString(sxsp_data).split("\n");
	var len = strs.length;
	var i=0;
	for (i=0;i<len;i++){
		if (sxsp_data.adopt[i].status==0) TableAddLine(strs[i],i);
	}
}
window.onload=function init(){
    GetRequest();
	changeZjfName("../../json/infortest_zjf.json");
	getSxsp_data("../../json/listtest_sxsp.json");
	//console.log(sxsp_data);
	refreshTable();
	//refreshTable("listtest_sxsp.json");
};
function GetRequest() {
    var url = location.search;//获取页面所在路径
    //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);  //获取到路径携带的信息
        strs = str.split("&"); //将携带信息分成一个数组(未知多少信息)
        for(var i = 0; i < strs.length; i ++) {
            //theRequest[属性名]==值  组装成对象
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  //unescape()对通过 escape() 编码的字符串进行解码
        }
    }
    console.log(theRequest);
}