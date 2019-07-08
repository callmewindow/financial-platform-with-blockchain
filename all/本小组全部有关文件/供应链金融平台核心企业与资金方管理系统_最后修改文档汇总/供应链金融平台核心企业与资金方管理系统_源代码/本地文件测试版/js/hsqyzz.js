var waitObj=[];

/*[{"cname":"test0","class":"test0","id":"test0","pname":"test0","time":"test0"},
             {"cname":"test1","class":"test1","id":"test1","pname":"test1","time":"test1"},
             {"cname":"test2","class":"test2","id":"test2","pname":"test2","time":"test2"},
             {"cname":"test3","class":"test3","id":"test3","pname":"test3","time":"test3"},
             {"cname":"test4","class":"test4","id":"test4","pname":"test4","time":"test4"}];*/
var passObj=[];
var rejectObj=[];

function pass(e){
    waitObj[parseInt(e.id)].status ++;
    passObj.push(waitObj[parseInt(e.id)]);
    waitObj.splice(parseInt(e.id),1);
    var waitTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td><td><h4>操作</h4></td></tr>";
    for(var i=0;i<waitObj.length;i++){
        waitTable+="<tr style='height: 40px;text-align:center;'><td>"+waitObj[i].Supplier.user.name
            +"</td><td>"+waitObj[i].Supplier.user.profile.type
            +"</td><td>"+waitObj[i].Supplier.user.profile.num
            +"</td><td>"+waitObj[i].Supplier.user.profile.person
            +"</td><td>"+waitObj[i].adopt_time
            +"</td><td><a id="+i+" href='javascript:void(0)' onclick='pass(this)'>[通过]</a> <a id="+i+" href='javascript:void(0)' onclick='reject(this)'>[驳回]</a></td></tr>";

    }
    waitTable+="</table>";
    document.getElementById("container0").innerHTML = waitTable;
    var passTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td></tr>";
    for(var i=0;i<passObj.length;i++){
        passTable+="<tr style='height: 40px;text-align:center;'><td>"+passObj[i].Supplier.user.name
            +"</td><td>"+passObj[i].Supplier.user.profile.type
            +"</td><td>"+passObj[i].Supplier.user.profile.num
            +"</td><td>"+passObj[i].Supplier.user.profile.person
            +"</td><td>"+passObj[i].adopt_time
            +"</td></tr>";

    }
    passTable+="</table>";
    document.getElementById("container1").innerHTML = passTable;
    alert("已通过");
}

function reject(e){
    waitObj[parseInt(e.id)].status = -1;
    rejectObj.push(waitObj[parseInt(e.id)]);
    waitObj.splice(parseInt(e.id),1);
    var waitTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td><td><h4>操作</h4></td></tr>";
    for(var i=0;i<waitObj.length;i++){
        waitTable+="<tr style='height: 40px;text-align:center;'><td>"+waitObj[i].Supplier.user.name
            +"</td><td>"+waitObj[i].Supplier.user.profile.type
            +"</td><td>"+waitObj[i].Supplier.user.profile.num
            +"</td><td>"+waitObj[i].Supplier.user.profile.person
            +"</td><td>"+waitObj[i].adopt_time
            +"</td><td><a id="+i+" href='javascript:void(0)' onclick='pass(this)'>[通过]</a> <a id="+i+" href='javascript:void(0)' onclick='reject(this)'>[驳回]</a> <a href='javascript:void(0)' id="+i+" onclick='showDetail(this)'>[查看详情]</a></td></tr>";

    }
    waitTable+="</table>";
    document.getElementById("container0").innerHTML = waitTable;
    var rejectTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td></tr>";
    for(var i=0;i<rejectObj.length;i++){
        rejectTable+="<tr style='height: 40px;text-align:center;'><td>"+rejectObj[i].Supplier.user.name
            +"</td><td>"+rejectObj[i].Supplier.user.profile.type
            +"</td><td>"+rejectObj[i].Supplier.user.profile.num
            +"</td><td>"+rejectObj[i].Supplier.user.profile.person
            +"</td><td>"+rejectObj[i].adopt_time
            +"</td></tr>";
    }
    rejectTable+="</table>";
    document.getElementById("container2").innerHTML = rejectTable;
    alert("已驳回");
    console.log("");
}

//查看详情的方法，e.id为下标，waitObj[parseInt(e.id)]即为该条完整记录（格式为json对象）
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
    setContent(waitObj[parseInt(e.id)]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}


window.onload = function() {
    $(document).ready(function () {
        $.ajax({
            url: '../../json/infortest_hxqy.json',
            async: true,
            dataType: 'JSON',
            success: function (data) {
                //var d = eval("("+data+")");
                var d = data;
                document.getElementById("addName").innerHTML = d.user.name;
            }
        })
    });
    $(document).ready(function () {
        GetRequest();
        $.ajax({
            url: '../../json/listtest_qq.json',
            async: true,
            dataType: 'JSON',
            success: function (data) {
                //var d = eval("("+data+")");
                var d = data;
                waitObj=d.adopt;
                var oTab = document.getElementById("tab");
                var aH3 = oTab.getElementsByTagName("h3");
                var aDiv = oTab.getElementsByTagName("div");
                for (var i = 0; i < aH3.length; i++) {
                    aH3[i].index = i;
                    aH3[i].onclick = function() {
                        for (var i = 0; i < aH3.length; i++) {
                            aH3[i].className = "";
                            aDiv[i].style.display = "none";
                            aDiv[this.index].className = "";
                            aDiv[this.index].className = "content";
                        }
                        this.className = "active";
                        aDiv[this.index].style.display = "block";
                    };
                }
                var waitTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td><td><h4>操作</h4></td></tr>";
                for(var i=0;i<waitObj.length;i++){
                    waitTable+="<tr style='height: 40px;text-align:center;'><td>"+waitObj[i].Supplier.user.name
                        +"</td><td>"+waitObj[i].Supplier.user.profile.type
                        +"</td><td>"+waitObj[i].Supplier.user.profile.num
                        +"</td><td>"+waitObj[i].Supplier.user.profile.person
                        +"</td><td>"+waitObj[i].adopt_time
                        +"</td><td><a href='javascript:void(0)' id="+i+" onclick='pass(this)'>[通过]</a> <a href='javascript:void(0)' id="+i+" onclick='reject(this)'>[驳回]</a> <a href='javascript:void(0)' id="+i+" onclick='showDetail(this)'>[查看详情]</a></td></tr>";

                }
                waitTable+="</table>";
                document.getElementById("container0").innerHTML = waitTable;

                var passTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td></tr>";
                for(var i=0;i<passObj.length;i++){
                    passTable+="<tr style='height: 40px;text-align:center;'><td>"+passObj[i].Supplier.user.name
                        +"</td><td>"+passObj[i].Supplier.user.profile.type
                        +"</td><td>"+passObj[i].Supplier.user.profile.num
                        +"</td><td>"+passObj[i].Supplier.user.profile.person
                        +"</td><td>"+passObj[i].adopt_time
                        +"</td></tr>";
                }
                passTable+="</table>";
                document.getElementById("container1").innerHTML = passTable;

                var rejectTable="<table rules=rows><tr style='background:#E6E6E6;color:#A0A0A0;'><td><h4>企业名称</h4></td><td><h4>证件类型</h4></td><td><h4>证件号码</h4></td><td><h4>法人姓名</h4></td><td><h4>提交时间</h4></td></tr>";
                for(var i=0;i<rejectObj.length;i++){
                    rejectTable+="<tr style='height: 40px;text-align:center;'><td>"+rejectObj[i].Supplier.user.name
                        +"</td><td>"+rejectObj[i].Supplier.user.profile.type
                        +"</td><td>"+rejectObj[i].Supplier.user.profile.num
                        +"</td><td>"+rejectObj[i].Supplier.user.profile.person
                        +"</td><td>"+rejectObj[i].adopt_time
                        +"</td></tr>";

                }
                rejectTable+="</table>";
                document.getElementById("container2").innerHTML = rejectTable;


            }
        });
    });
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