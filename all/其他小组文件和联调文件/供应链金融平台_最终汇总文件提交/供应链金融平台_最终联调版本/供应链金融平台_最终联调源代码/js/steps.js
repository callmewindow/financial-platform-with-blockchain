$(function () {
    window.step = $("#myStep").step({
        animate: true,
        initStep: 1,
        speed: 1000
    });
    $("#submitBtn2").click(function (event) {
        var mail = $("#mail").val();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var phonee = /.*/;///[1][3-9][0-9]{9,9}/;
        var maill = /^[a-zA-Z0-9_\-]+@.+$/;
        if ($.trim(phone) == "") {
            alert('请填写联系方式！');
            $("#phone").focus();
            return;
        }
        if ($.trim(name) == "") {
            alert('请填写姓名！');
            $("#name").focus();
            return;
        }
        if ($.trim(mail) == "") {
            alert('请填邮箱！');
            $("#mail").focus();
            return;
        }
        register();
        return;
    });
    $("#submitBtn").click(function (event) {
        var txtconfirm = $.trim($("#confirmpwd").val());
        var txtPwd = $.trim($("#password").val());
        var username = $.trim($("#username").val());
        var maill = /^[a-zA-Z0-9_\-]+@.+$/;
        if ($.trim(username) == "") {
            alert('请填写邮箱！');
            $("#phone").focus();
            return;
        }
        if (!maill.test(username)) {
            alert('邮箱格式不正确');
            $("#username").focus();
            return;
        }
        if ($.trim(txtPwd) == "") {
            alert('请输入你要设置的密码！');
            $("#txtPwd").focus();
            return;
        }
        if ($.trim(txtconfirm) == "") {
            alert('请再次输入密码！');
            $("#txtconfirm").focus();
            return;
        }
        if ($.trim(txtconfirm) != $.trim(txtPwd)) {
            alert('你输入的密码不匹配，请重新输入！');
            $("#txtconfirm").focus();
            return;
        }
        var identity = document.getElementById('choose').innerHTML;
        if(identity=='身份选择'){
            alert('请选择身份');
            return;
        }
        var yes = window.step.nextStep();
    });
});


(function (factory) {
        "use strict";
        if (typeof define === 'function') {
            // using CMD; register as anon module
            define.cmd && define('jquery-step', ['jquery'], function (require, exports, moudles) {
                var $ = require("jquery");
                factory($);
                return $;
            });
            define.amd && define(['jquery'], factory);
        } else {
            // no CMD; invoke directly
            factory((typeof (jQuery) != 'undefined') ? jQuery : window.Zepto);
        }
    }

    (function ($) {
        $.fn.step = function (options) {
            var opts = $.extend({}, $.fn.step.defaults, options);
            var size = this.find(".step-header li").length;
            var barWidth = opts.initStep < size ? 100 / (2 * size) + 100 * (opts.initStep - 1) / size : 100;
            var curPage = opts.initStep;

            this.find(".step-header").prepend("<div class=\"step-bar\"><div class=\"step-bar-active\"></div></div>");
            this.find(".step-list").eq(opts.initStep - 1).show();
            if (size < opts.initStep) {
                opts.initStep = size;
            }
            if (opts.animate == false) {
                opts.speed = 0;
            }
            this.find(".step-header li").each(function (i, li) {
                if (i < opts.initStep) {
                    $(li).addClass("step-active");
                }
                //$(li).prepend("<span>"+(i+1)+"</span>");
                $(li).append("<span>" + (i + 1) + "</span>");
            });
            this.find(".step-header li").css({
                "width": 100 / size + "%"
            });
            this.find(".step-header").show();
            this.find(".step-bar-active").animate({
                    "width": barWidth + "%"
                },
                opts.speed, function () {

                });

            this.nextStep = function () {
                if (curPage >= size) {
                    return false;
                }
                return this.goStep(curPage + 1);
            }

            this.preStep = function () {
                if (curPage <= 1) {
                    return false;
                }
                return this.goStep(curPage - 1);
            }

            this.goStep = function (page) {
                if (page == undefined || isNaN(page) || page < 0) {
                    if (window.console && window.console.error) {
                        console.error('the method goStep has a error,page:' + page);
                    }
                    return false;
                }
                curPage = page;
                this.find(".step-list").hide();
                this.find(".step-list").eq(curPage - 1).show();
                this.find(".step-header li").each(function (i, li) {
                    $li = $(li);
                    $li.removeClass('step-active');
                    if (i < page) {
                        $li.addClass('step-active');
                        if (opts.scrollTop) {
                            $('html,body').animate({scrollTop: 0}, 'slow');
                        }
                    }
                });
                barWidth = page < size ? 100 / (2 * size) + 100 * (page - 1) / size : 100;
                this.find(".step-bar-active").animate({
                        "width": barWidth + "%"
                    },
                    opts.speed, function () {

                    });
                return true;
            }
            return this;
        };

        $.fn.step.defaults = {
            animate: true,
            speed: 500,
            initStep: 1,
            scrollTop: true
        };
    })
);