window.addEventListener("load", function () {
    window.table = $("#finance-data")
    var ends = 0;
    var sums = 0;
    loadStart();
    var rets = [];
    window.repaying = false
    var proc = function (result, ifAdd) {

        console.log(result);
        result.data.forEach(
            function (item) {
                rets.push({
                    createTime: item.createTime,
                    timestamp: -new Date(item.createTime).getTime(),
                    companyName: item.MoneyGiver.name,
                    businessName: item.CoreBusiness.name,
                    cheqValue: item.money.toLocaleString(),
                    interest: (item.rate * 100).toLocaleString() + '%',
                    length: item.days.toLocaleString() + '天',
                    status: function (status) {
                        if (status === -1)
                            return "<span class=\"label label-danger\">已驳回</span>";
                        else if (status === 3)
                            return "<span class=\"label label-success\">已出款</span>";
                        else if (status === 4)
                            return "<span class=\"label label-primary\">已还款</span>";
                        else
                            return "<span class=\"label label-warning\">待审批</span>";
                    }(item.status),
                    status_num: item.status,
                    id: item.id,
                    button: function () {
                        if (item.status === 3) return "<button class=\"btn btn-info pull-left btn-repay\">还款</button>"; else return "";
                    }
                });
                if (ifAdd) sums += item.money;
            }
        );
    };
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'-1'}",
        success: (x) => {
            proc(x, false);
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'0'}",
        success: (x) => {
            proc(x, false);
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'1'}",
        success: (x) => {
            proc(x, false);
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'2'}",
        success: (x) => {
            proc(x, false);
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'3'}",
        success: (x) => {
            proc(x, true);
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://114.115.240.16/api/financing/getFinancingByUserAndStatus',
        contentType: 'application/json',
        headers: {
            "token": window.token
        },
        data: "{'status':'4'}",
        success: (x) => {
            proc(x, false);
        }
    });
    $('#finance-data tbody').on('click', ".btn-repay", function () {
        aid = window.table.row($(this).closest('tr')).data().id;
        window.repaying = true
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://114.115.240.16/api/financing/repay',
            contentType: 'application/json',
            headers: {
                "token": window.token
            },
            data: JSON.stringify({id: aid}),
            success: function (result) {
                if (result['status'] === 1) {
                    alert('还款成功');
                    window.location.reload();
                } else {
                    alert(result.msg);
                }
            }
        });
    });
    $(document).ajaxStop(function () {
        if (!window.repaying) {
            window.table = window.table.DataTable({
                "autoWidth": false,
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
                data: rets,
                order: [[ 1, "desc" ]],
                columns: [
                    {
                        data: "id",
                        visible: false
                    },
                    {
                        data: {
                            _: "createTime",
                            sort: "timestamp"
                        }
                    },
                    {data: "companyName"},
                    {data: "businessName"},
                    {data: "cheqValue"},
                    {data: "interest"},
                    {data: "length"},
                    {
                        data: {
                            _: "status",
                            sort: "status_num"
                        }
                    },
                    {data: "button"}
                ],
            });
            $('#value')[0].innerText = sums.toLocaleString();

        } else {
            window.repaying = false;
        }
        loadEnd();
    })

})