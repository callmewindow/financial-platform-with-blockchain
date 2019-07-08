window.token = Cookies.get("token")
if(window.token==undefined) {
    window.location.href = '../login.html';
}
window.username = Cookies.get("email")
window.addEventListener("load",function () {
    $("#userTag")[0].innerText=window.username;
})
$.ajaxSetup({
    headers: { 'token': window.token}
});
window.verified = Cookies.get("verified");
if(window.verified)
{
    window.addEventListener("load",function () {
        $("#verify-tag").click(function (e) {
            e.preventDefault()
        })
    })
}else{
    window.addEventListener("load",function () {
        $(".disable-verify").click(function (e) {
            e.preventDefault()
        })
    })
}