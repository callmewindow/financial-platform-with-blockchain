// js for 资金方首页
var data = null;
var tokenid = localStorage.getItem("token");
var email = localStorage.getItem("email");

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
    $.ajax(settings).done(function (e) {
        // data1 = eval("("+e+")")
        console.log(e);
        data = e.data;
        document.getElementById("test1").innerHTML = data.name;
        document.getElementById("fucktest").innerHTML = data.profile.finCounts[0];
        document.getElementById("fucktest2").innerHTML = data.profile.finCounts[2];
    });
};