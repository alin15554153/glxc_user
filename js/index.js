$(document).ready(function(){
	$("#content").height($(window).height()-$("#header").height()-$("#footer").height()-4);
	window.onresize=function(){
		$("#content").height($(window).height()-$("#header").height()-$("#footer").height()-4);
	}
	$("#username").live({focus:function(){
		$(this).removeClass("required-number");
	},blur:function(){
		if($.trim($(this).val())==""){
			$(this).addClass("required-number");
		}
	}})
	$("#password").live({focus:function(){
		$(this).removeClass("required-password");
	},blur:function(){
		if($.trim($(this).val())==""){
			$(this).addClass("required-password");
		}
	}})

	$(".btn-submit").live({click:function(){
		if($.trim($("#username").val())==""){
				$("#username").addClass("required-number");
		}
		if($.trim($("#password").val())==""){
				$("#password").addClass("required-password");
		}
	}})

	$("#username").focus();
})