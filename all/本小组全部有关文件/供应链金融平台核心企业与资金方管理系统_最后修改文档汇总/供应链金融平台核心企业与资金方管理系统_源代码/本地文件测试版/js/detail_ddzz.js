var informationString = "yourinfomation";
var data = null;
function setContent(all) {
    console.log(all);
    all.status = 1;
    console.log(all);
    document.getElementById("gys_name_content").innerHTML = all.Supplier.user.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.user.profile.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.user.profile.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.user.profile.person;
    document.getElementById("dd_num_content").innerHTML = all.order_num;
    document.getElementById("dd_money_content").innerHTML = all.order_money;
    document.getElementById("begintime").innerHTML = all.order_begintime;
    document.getElementById("endtime").innerHTML = all.order_endtime;
}
function showDetail(){
    document.getElementById("bg").style.display = "block";
    setContent(data.order[0]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
window.onload = function () {
    $(document).ready(function () {
        $.ajax({
            url: '../../json/listtest_dd.json',
            async: true,
            success: function (e) {
                data = e;
            }
        });
    });
    document.getElementById("bg").style.display = "none";
};