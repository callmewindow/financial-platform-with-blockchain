// js for 核心企业确权
var waitObj=[];
var tokenid = localStorage.getItem("token");
var email = localStorage.getItem("email");

function pass(e){
    var settings = {
        "url": "http://114.115.240.16/api/financing/confirm",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"id\":"+waitObj[parseInt(e.id)].id+"\n}",
    };
    $.ajax(settings).done(function (response) {
        alert("确权结果："+response.msg);
        location.reload();
    });
}
function reject(e){
    var settings = {
        "url": "http://114.115.240.16/api/financing/reject",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"id\":"+waitObj[parseInt(e.id)].id+"\n}",
    };
    $.ajax(settings).done(function (response) {
        alert("驳回结果："+response.msg);
        location.reload();
    });
}
//查看详情的方法，e.id为下标，waitObj[parseInt(e.id)]即为该条完整记录（格式为json对象）
function setContent(all) {
    console.log(all);
    document.getElementById("truetime").innerHTML = all.createTime.substring(0,10);
    document.getElementById("gys_name_content").innerHTML = all.Supplier.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.additional.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.additional.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.additional.person;
    document.getElementById("gys_credit_content").innerHTML = all.Supplier.additional.trust;
    document.getElementById("gys_crenum_content").innerHTML = all.Supplier.additional.trust_money;
}
function showDetail(e){
    document.getElementById("bg").style.display = "block";
    setContent(waitObj[parseInt(e.id)]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}


window.onload = function() {
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
        console.log(data);
        //var d = eval("("+data+")");
        var d = data;
        document.getElementById("addName").innerHTML = d.data.name;
    });

    var settings = {
        "url": "http://114.115.240.16/api/financing/getFinancingByUserAndStatus",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"status\":\"1\"\n}",
    };
    $.ajax(settings).done(function (data) {
        console.log(data);
        var d = data;
        waitObj=d.data;
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
            waitTable+="<tr style='height: 40px;text-align:center;'><td>"+waitObj[i].Supplier.name
                +"</td><td>"+waitObj[i].Supplier.additional.type
                +"</td><td>"+waitObj[i].Supplier.additional.num
                +"</td><td>"+waitObj[i].Supplier.additional.person
                +"</td><td>"+waitObj[i].createTime.substring(0,10)
                +"</td><td><a href='javascript:void(0)' id="+i+" onclick='pass(this)'>[通过]</a> <a href='javascript:void(0)' id="+i+" onclick='reject(this)'>[驳回]</a> <a href='javascript:void(0)' id="+i+" onclick='showDetail(this)'>[查看详情]</a></td></tr>";
        }
        waitTable+="</table>";
        document.getElementById("container0").innerHTML = waitTable;
    });

};