window.addEventListener("load", function () {
    loadStart();
    window.cont = 0
    $(document).ajaxStop(function () {
        if (window.cont == 0)
            loadEnd();
    });
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://114.115.240.16/api/account/getMoney',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },

        success: function (result) {
            aja = this

            if (result.status == 0) {
                window.cont = 1;
                setTimeout(function () {
                    $.ajax(aja)
                }, 3000);
            } else {
                window.cont = 0;
                window.money = result.data
                $("#value")[0].innerText = result.data.toLocaleString();
            }
        }
    });
    $('#withdraw-btn').click(function () {
        var money = Number.parseFloat($('#cash-value').val());
        if (isNaN(money)) {
            alert("数值不合法！");
            return;
        }
        $.ajax({
            "url": "http://114.115.240.16/api/account/withdraw",
            "method": "POST",
            "headers": {"token": window.token},
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                money: money
            }),
            success: function (result) {
                if (result['status'] === 1) {
                    alert('提交成功');
                    window.location.reload();
                } else {
                    alert(result.msg);
                }
            }
        })
    });
    $('#recharge-btn').click(function () {
        var money = Number.parseFloat($('#cash-value').val());
        if (isNaN(money)) {
            alert("数值不合法！");
            return;
        }
        $.ajax({
            "url": "http://114.115.240.16/api/account/recharge",
            "method": "POST",
            "headers": {"token": window.token},
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                money: money
            }),
            success: function (result) {
                if (result['status'] === 1) {
                    alert('提交成功');
                    window.location.reload();
                } else {
                    alert(result.msg);
                }
            }
        })
    });
})