// js for 核心企业首页
var data = {userProfile:null, orderList:null};
var tokenid = localStorage.getItem("token");
var email = localStorage.getItem("email");

function setContent(all) {
    console.log(all);
    document.getElementById("gys_name_content").innerHTML = all.Supplier.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.additional.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.additional.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.additional.person;
    document.getElementById("dd_num_content").innerHTML = all.number;
    document.getElementById("dd_money_content").innerHTML = all.money;
    document.getElementById("begintime").innerHTML = all.createTime.substring(0,10);
    document.getElementById("endtime").innerHTML = all.endTime.substring(0,10);
}
function showDetail(index){
    document.getElementById("bg").style.display = "block";
    setContent(data.orderList[index]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
function payOrder(index){
    var settings = {
        "url": "http://114.115.240.16/api/order/pay",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"id\":"+data.orderList[index].id+"\n}",
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("付款结果："+response.msg);
        location.reload();
    });

}

window.onload = function() {
    //根据邮箱获得信息
    var settings = {
        "url": "http://114.115.240.16/api/user/getUserByEmail",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": "{\n\t\"email\":"+email+"\n}",
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        data.userProfile = response.data;
        initUserProfile(response.data);
    });

    var settings = {
        "url": "http://114.115.240.16/api/order/getOrderByUserAndStatus",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "token": tokenid
        },
        "data": "{\n\t\"status\":\"0\"\n}",
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        data.orderList = response.data;
        initTable(response.data);
    });
};

function initUserProfile(user) {
    document.getElementById("hxqy-name").innerHTML = user.name;
    // document.getElementById("profile-money").innerHTML = "暂时不能查询";
    document.getElementById("profile-order").innerHTML = user.profile.orderCount;
    document.getElementById("profile-not-adopt").innerHTML = user.profile.finCounts[1];
    document.getElementById("profile-already").innerHTML = user.profile.finCounts[2]+user.profile.finCounts[3];
}
function initTable(orders) {
    var table = "<tr><th>供应商</th><th>合同编号</th><th>电商订单日期</th><th>最迟付款日</th><th>账面金额（万元）</th><th>操作</th></tr>"
    var lineNum = 0;
    var line;
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status == 1) continue;
        line = ((lineNum % 2) ? "<tr class='interline'>" : "<tr>")
            + "<td>" + orders[i].Supplier.name
            + "</td><td>" + orders[i].number
            + "</td><td>" + orders[i].createTime.substring(0,10)
            + "</td><td>" + orders[i].endTime.substring(0,10)
            + "</td><td>" + orders[i].money
            + "</td><td>"
            + "<a class='tbutton' onclick='payOrder(" + i + ")'>[付款]</a>"
            + "<a class='tbutton' onclick='showDetail(" + i + ")'>[查看详情]</a>"
            + "</td>";
        table += line;
        lineNum++;

    }
    document.getElementById("order_table").innerHTML = table;
}

//订单有关
function showOrder(){
    document.getElementById("orderbg").style.display = "block";
}
function hideOrder(){
    document.getElementById("orderbg").style.display = "none";
}
function createOrder() {
    var email2 = document.getElementById('ogct');
    var id2 = document.getElementById('oict');
    var money2 = document.getElementById('omct');
    var days2 = document.getElementById('odct');
    if(email2.value){
        if(id2.value){
            if(money2.value){
                if(days2.value){
                    var settings = {
                        "url": "http://114.115.240.16/api/order/createOrder",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "token": tokenid
                        },
                        "data": "{\n\t\"Supplier_email\":"+email2.value+",\n\t\"money\":"+money2.value+",\n\t\"number\":"+id2.value+",\n\t\"days\":"+days2.value+"\n}",
                    };
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        alert("订单创建结果："+response.msg+"请刷新页面后进行查看");
                    });
                    email2.value = "";
                    id2.value = "";
                    money2.value = "";
                    days2.value = "";
                    return ;
                }
            }
        }
    }
    alert("请完整填写信息后再次提交");
}
