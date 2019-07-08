$(function() {
		var step= $("#myStep").step({
			animate:true,
			initStep:1,
			speed:1000
		});
    $("#submitBtn2").click(function(event) {
      var mail = $("#mail").val();
      var name = $("#name").val();
      var phone = $("#phone").val();		
      var phonee =/.*/;///[1][3-9][0-9]{9,9}/;
      var maill =/.*/;///^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+[a-zA-Z]+$/;
      if(!maill.test(mail)){
        Tip('邮箱格式不正确');
        $("#mail").focus();
        return;
      }
      if(!phonee.test(phone)){
        Tip('电话格式不正确');
        $("#phone").focus();
        return;
      }
      if ($.trim(phone) == "") {
        Tip('请填写联系方式！');
        $("#phone").focus();
        return;
      }  
      if ($.trim(name) == "") {
        Tip('请填写姓名！');
        $("#name").focus();
        return;
      }  
      if ($.trim(mail) == "") {
        Tip('请填邮箱！');
        $("#mail").focus();
        return;
      }  
    var yes=step.nextStep();
    register();
    return;	
  });
		$("#submitBtn").click(function(event) {
		    var txtconfirm = $.trim($("#confirmpwd").val());
	        var txtPwd = $.trim($("#password").val());
             var username = $.trim($("#username").val());
             if ($.trim(username) == "") {
               Tips('请填写用户名！');
               $("#phone").focus();
               return;
             }  
	          if ($.trim(txtPwd) == "") {
	
	         	Tips('请输入你要设置的密码！');
		       $("#txtPwd").focus();
		      return;
		
	            }
			  if($.trim(txtconfirm) == "") {
	
	         	Tips('请再次输入密码！');
		       $("#txtconfirm").focus();
		      return;
		
	            }
			  if( $.trim(txtconfirm) != $.trim(txtPwd) ) {
	
	         	Tips('你输入的密码不匹配，请重新输入！');
		       $("#txtconfirm").focus();
		      return;
		
	            }		
			  var yes=step.nextStep();
		});
	});


(function (factory) {
    "use strict";
    if (typeof define === 'function') {
        // using CMD; register as anon module
      define.cmd&&define('jquery-step', ['jquery'], function (require, exports, moudles) {
            var $=require("jquery");
            factory($);
            return $;
        });
      define.amd&&define(['jquery'], factory);
    } else {
        // no CMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($){
  $.fn.step = function(options) { 
      var opts = $.extend({}, $.fn.step.defaults, options);
      var size=this.find(".step-header li").length;
      var barWidth=opts.initStep<size?100/(2*size)+100*(opts.initStep-1)/size : 100;
      var curPage=opts.initStep;

      this.find(".step-header").prepend("<div class=\"step-bar\"><div class=\"step-bar-active\"></div></div>");
      this.find(".step-list").eq(opts.initStep-1).show();
      if (size<opts.initStep) {
        opts.initStep=size;
      }
      if (opts.animate==false) {
        opts.speed=0;
      }
      this.find(".step-header li").each(function (i, li) {
        if (i<opts.initStep){
          $(li).addClass("step-active");
        }
        //$(li).prepend("<span>"+(i+1)+"</span>");
        $(li).append("<span>"+(i+1)+"</span>");
    });
    this.find(".step-header li").css({
      "width": 100/size+"%"
    });
    this.find(".step-header").show();
    this.find(".step-bar-active").animate({
        "width": barWidth+"%"},
        opts.speed, function() {
        
    });

      this.nextStep=function() {
        if (curPage>=size) {
          return false;
        }
        return this.goStep(curPage+1);
      }

      this.preStep=function() {
        if (curPage<=1) {
          return false;
        }
        return this.goStep(curPage-1);
      }

      this.goStep=function(page) {
        if (page ==undefined || isNaN(page) || page<0) {
          if(window.console&&window.console.error){
            console.error('the method goStep has a error,page:'+page);
          }
        return false;
        }
        curPage=page;
        this.find(".step-list").hide();
        this.find(".step-list").eq(curPage-1).show();
        this.find(".step-header li").each(function (i, li) {
          $li=$(li);
          $li.removeClass('step-active');
          if (i<page){
            $li.addClass('step-active');
            if(opts.scrollTop){
             $('html,body').animate({scrollTop:0}, 'slow');
            }
        }
      });
      barWidth=page<size?100/(2*size)+100*(page-1)/size : 100;
        this.find(".step-bar-active").animate({
          "width": barWidth+"%"},
          opts.speed, function() {
            
        });
        return true;
      }
      return this;
  };
   
  $.fn.step.defaults = {
      animate:true,
      speed:500,
    initStep:1,
    scrollTop:true
  };
})
 );  