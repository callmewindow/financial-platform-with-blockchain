var informationString = "yourinfomation";
var data = null;
function setContent(all) {
    console.log(all);
    document.getElementById("truetime").innerHTML = all.adopt_time;
    document.getElementById("gys_name_content").innerHTML = all.Supplier.user.name;
    document.getElementById("gys_type_content").innerHTML = all.Supplier.user.profile.type;
    document.getElementById("gys_num_content").innerHTML = all.Supplier.user.profile.num;
    document.getElementById("gys_person_content").innerHTML = all.Supplier.user.profile.person;
    document.getElementById("gys_credit_content").innerHTML = all.Supplier.user.profile.trust;
    document.getElementById("gys_crenum_content").innerHTML = all.Supplier.user.profile.trust_money;
    document.getElementById("gys_hxqy_name_content").innerHTML = all.CoreBusiness.user.name;
}
function showDetail(){
    document.getElementById("bg").style.display = "block";
    setContent(data.adopt[0]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
window.onload = function () {
    $(document).ready(function () {
        $.ajax({
            url: '../../json/listtest_rzsp.json',
            async: true,
            success: function (e) {
                data = e;
            }
        });
    });
    document.getElementById("bg").style.display = "none";
};