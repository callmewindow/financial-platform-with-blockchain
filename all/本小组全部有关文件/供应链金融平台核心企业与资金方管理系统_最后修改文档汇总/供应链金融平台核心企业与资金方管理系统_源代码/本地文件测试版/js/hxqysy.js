// js for 核心企业首页

var data = {userProfile:null, orderList:null};
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
function showDetail(index){
    document.getElementById("bg").style.display = "block";
    setContent(data.orderList[index]);
}
function hideDetail(){
    document.getElementById("bg").style.display = "none";
}
function payOrder(index){
    var money = data.userProfile.profile.money;
    var bill = data.orderList[index].order_money;
    // alert("money = " + money + "; bill = " + bill);
    if (money < bill) {
        alert("剩余资金不足，无法付款");
    } else {
        data.userProfile.profile.money -= bill;
        data.orderList[index].status = 1;
        initTable(data.orderList);
        initUserProfile(data.userProfile);
        alert("付款成功");
    }

}

window.onload = function() {
    GetRequest();
    $(document).ready(function () {
        $.ajax({
            url: '../../json/infortest_hxqy.json',
            async: true,
            dataType: 'JSON',
            success: function (d){
                data.userProfile = d.user;
                initUserProfile(d.user);
            }
        })

        $.ajax({
            url: '../../json/listtest_dd.json',
            async: true,
            dataType: 'JSON',
            success: function (d){
                data.orderList = d.order;
                initTable(d.order);
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

function initUserProfile(user) {
    document.getElementById("hxqy-name").innerHTML = user.name;
    document.getElementById("profile-money").innerHTML = user.profile.money;
    document.getElementById("profile-order").innerHTML = user.profile.order;
    document.getElementById("profile-not-adopt").innerHTML = user.profile.not_adopt;
    document.getElementById("profile-already").innerHTML = user.profile.already_adopt;
}
function initTable(orders) {
    var table = "<tr><th>供应商</th><th>合同编号</th><th>电商订单日期</th><th>最迟付款日</th><th>账面金额（万元）</th><th>操作</th></tr>"
    // var table = document.getElementById("order_table");
    /*
    <tr class="interline">
        供应商, 合同编号, 订单日期, 最迟付款日, 金额
        <td>
            <a class='button' onclick='showDetail(i)'>[详情]</a>   
            <a class='button' onclick='payOrder(i)'>[付款]</a>   
        </td>
    </tr>
    */

    var lineNum = 0;
    var line;
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status == 1) continue;
        line = ((lineNum % 2) ? "<tr class='interline'>" : "<tr>")
            + "<td>" + orders[i].Supplier.user.name
            + "</td><td>" + orders[i].order_num
            + "</td><td>" + orders[i].order_begintime
            + "</td><td>" + orders[i].order_endtime
            + "</td><td>" + orders[i].order_money
            + "</td><td>"
            + "<a class='tbutton' onclick='payOrder(" + i + ")'>[付款]</a>"
            + "<a class='tbutton' onclick='showDetail(" + i + ")'>[查看详情]</a>"
            + "</td>";
        table += line;
        lineNum++;


        // line = document.createElement('tr'); //创建行
        // if (lineNum % 2) line.className = 'interline';
        // line.appendChild(createCell(orders[i].Supplier.user.name));
        // line.appendChild(createCell(orders[i].order_num));
        // line.appendChild(createCell(orders[i].order_begintime));
        // line.appendChild(createCell(orders[i].order_endtime));
        // line.appendChild(createCell(orders[i].order_money));

        // var opt = createCell('');
        // var cell = document.createElement('td');


        // table.appendChild(line);
        // lineNum++;
    }
    document.getElementById("order_table").innerHTML = table;
}

function createCell(text) {
    var cell = document.createElement('td');
    cell.innerText = text;
    return cell;

}
