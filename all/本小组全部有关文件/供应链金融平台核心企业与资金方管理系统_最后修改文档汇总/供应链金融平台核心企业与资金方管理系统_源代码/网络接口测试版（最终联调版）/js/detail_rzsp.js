var informationString = "yourinfomation";
var data = null;
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
function showDetail(){
    document.getElementById("bg").style.display = "block";
    setContent(data.adopt[0]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
// window.onload = function () {
//     $(document).ready(function () {
//         $.ajax({
//             url: '../../json/listtest_rzsp.json',
//             async: true,
//             success: function (e) {
//                 data = e;
//             }
//         });
//     });
//     document.getElementById("bg").style.display = "none";
// };