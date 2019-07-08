var data = null;

window.onload = function() {
    GetRequest();
    $(document).ready(function () {
        $.ajax({
            url: '../../json/infortest_zjf.json',
            async: true,
            dataType: 'JSON',
            success: function (e) {
                // data1 = eval("("+e+")")
                console.log(e);
                data = e;
                document.getElementById("test1").innerHTML = data.user.name;
                document.getElementById("fucktest").innerHTML = data.user.profile.new_adopt;
                document.getElementById("fucktest2").innerHTML = data.user.profile.money_adopt;
            }
        })
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