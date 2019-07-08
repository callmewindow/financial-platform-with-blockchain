window.addEventListener("load", function () {
    var table = $("#conf-data")
    loadStart();
    $(document).ajaxStop(function () {
        loadEnd();
    });
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: 'http://114.115.240.16/api/user/getUserInfo',
        headers: {token: Cookies.get('token')},
        success: function (result) {
            if (result.status === 1) {
                if (result.data.profile.approved)
                    $('#value')[0].innerText = result.data.profile.approved.toLocaleString();
                else
                    $('#value')[0].innerText = 0;
            } else {
                console.log(result['msg']);
            }
        },
    });
    table.dataTable({
        "language": {
            "decimal": ".",
            "emptyTable": "没有数据",
            "info": "显示_START_至_END_条，共 _TOTAL_条",
            "infoEmpty": "",
            "infoFiltered": "(搜索结果共_MAX_ 条)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "显示_MENU_ 条数据",
            "loadingRecords": "加载中...",
            "processing": "处理中...",
            "search": "搜索",
            "zeroRecords": "未找到结果",
            "paginate": {
                "first": "第一页",
                "last": "末页",
                "next": "下一页",
                "previous": "上一页"
            },
            "aria": {
                "sortAscending": ": 自大至小排序",
                "sortDescending": ": 自小至大排序"
            }
        },
        ajax: {
            type: 'GET',
            dataType: 'json',
            url: 'http://114.115.240.16/api/credit/getRecordCredit',
            contentType: 'application/json',
            headers: {
                "token": window.token
            },
            dataSrc: function (result) {
                var rets = [];
                var maxts = 0;
                var maxmoney = 0;
                console.log(result);
                result.data.forEach(
                    function (item) {
                        var ts = new Date(item.createTime).getTime();
                        rets.push({
                            createTime: item.createTime,
                            timestamp: ts,
                            value: item.applied,
                            valueDone: item.approved
                        });
                        if (maxts < ts && item.status === 1) {
                            maxts = ts;
                            maxmoney = item.value;
                        }

                    }
                );
                console.log(rets);
                return rets;

            }
        },
        columns: [
            {
                data: {
                    _: "createTime",
                    sort: "timestamp"
                }
            },
            {data: "value"},
            {data: "valueDone"}
        ]
    });
    $('#credit-submit').click(function () {
        var money = Number.parseInt($('#valuebox').val());
        if (isNaN(money)) {
            alert("数值不合法！");
            return;
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://114.115.240.16/api/credit/apply',
            contentType: 'application/json',
            headers: {
                "token": window.token
            },
            data: JSON.stringify(
                {
                    "money": money
                })
        })
        $('#valuebox').val('');
    })
})
