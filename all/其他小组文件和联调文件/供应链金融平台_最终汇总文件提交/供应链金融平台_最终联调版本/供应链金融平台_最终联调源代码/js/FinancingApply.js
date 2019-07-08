window.addEventListener("load", function () {
    $("#box-stage-2").hide();
    $("#box-stage-3").hide();
    $("#box-stage-4").hide();
    $("#box-stage-5").hide();
    $(document).ajaxStop(function () {
        loadEnd();
    })
    $('form input').on('keypress', function (e) {
        return e.which !== 13;
    });

    window.table_stage_2 = $("#corporation-table").DataTable({
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
        columns: [
            {data: "id"},
            {data: "name"},
            {data: "button"},
            {
                data: "email",
                visible: false
            }
        ]
    });
    window.table_stage_3 = $("#business-table").DataTable({
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
        columns: [
            {data: "id"},
            {data: "name"},
            {data: "button"},
            {
                data: "email",
                visible: false
            }
        ]
    });
    window.table_stage_4 = $("#product-table").DataTable(
        {
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
            columns: [
                {data: "id"},
                {data: "name"},
                {data: "interest"},
                {data: "time_length"},
                {data: "method"},
                {data: "button"}
            ],
        }
    );
    $("#accounts-receivable").click(function () {
        window.table_stage_2.clear();
        loadStart();
        $.ajax({
            "url": "http://114.115.240.16/api/user/getAllMoneyGivers",
            "method": "GET",
            success: function (res) {
                res.data.forEach(function (item) {
                    window.table_stage_2.row.add({
                        id: item.id,
                        name: item.name,
                        button: "<button class=\"btn btn-info pull-left btn-next-stage-2\">申请</button>",
                        email: item.email
                    })
                });
                window.table_stage_2.draw();
                $('#corporation-table tbody').on('click', ".btn-next-stage-2",function () {
                    window.aid = window.table_stage_2.row($(this).closest('tr')).data().email;
                    window.table_stage_3.clear();
                    loadStart();
                    $.ajax({
                        "url": "http://114.115.240.16/api/user/getAllCoreBusinesses",
                        "method": "GET",
                        success: function (res) {
                            res.data.forEach(function (item) {
                                window.table_stage_3.row.add({
                                    id: item.id,
                                    name: item.name,
                                    button: "<button class=\"btn btn-info pull-left btn-next-stage-3\">申请</button>",
                                    email: item.email,
                                })
                            });
                            window.table_stage_3.draw();
                            $('#business-table tbody').on('click', ".btn-next-stage-3",function () {
                                window.bid = window.table_stage_3.row($(this).closest('tr')).data().email;
                                window.table_stage_4.clear();
                                $.ajax({
                                    "url": "http://114.115.240.16/api/product/getAllProducts",
                                    "method": "GET",
                                    dataType: 'json',
                                    success: function (res) {

                                        res.data.forEach(function (item) {
                                            item.button = "<button class=\"btn btn-info pull-left btn-next-stage-4\">申请</button>";
                                            item.time_length = item.days + "天";
                                            item.interest = (item.rate * 100) + "%";
                                            const add = JSON.parse(item.additional);
                                            item.method = add.type + ' ' + add.return;
                                            window.table_stage_4.row.add(item)
                                        })
                                        window.table_stage_4.draw();
                                        $("#box-stage-3").hide();
                                        $("#box-stage-4").show();

                                        $('#product-table tbody').on('click', ".btn-next-stage-4",function () {
                                            window.pid = window.table_stage_4.row($(this).closest('tr')).data().id;
                                            $("#box-stage-4").hide();
                                            $("#box-stage-5").show();
                                        })

                                    }
                                })
                            })
                            $("#box-stage-2").hide();
                            $("#box-stage-3").show();
                        }
                    })
                })

            }
        })
        $("#box-stage-1").hide();
        $("#box-stage-2").show();
    })
    $('#final-submit').click(function () {
        var money = Number.parseInt($('#adopt_money').val());
        if (isNaN(money)) {
            alert("数值不合法！");
            return;
        }
        $.ajax({
            "url": "http://114.115.240.16/api/financing/createFinancing",
            "method": "POST",
            "headers": {"token": window.token},
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                CoreBusiness_email: window.bid,
                MoneyGiver_email: window.aid,
                adopt_money: money,
                product_id: window.pid
            }),
            success: function (result) {
                if (result['status'] === 1) {
                    alert('提交成功');
                    window.location.replace('./业务查询.html')
                } else {
                    alert(result.msg);
                }
            }
        })
    })
});
