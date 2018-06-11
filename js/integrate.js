require.config({
	paths: {
		base64: '../lib/common/base64',
	},
	shim: {
		base64: {
			exports: "Base64"
		}
	}
});

define(['tool'], function(tool) {
	/**
	 * 获取HTML页面请求参数方法
	 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var $$ = Dom7;
	var workToken = getQueryString('token');
	if(workToken) {
		$$.ajax({
			url: tool.appPath.emopPro + 'base/h5/getUser',
			data: {},
			method: 'POST',
			dataType: 'json',
			timeout: 30000, //超时时间设置为30秒
			contentType: 'application/x-www-form-urlencoded',
			crossDomain: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'AI-Requested-Way': 'APP',
				'AI-Login-Token': workToken
			},
			success: function(data, status, xhr) {
				if(!data.state && data.code == "JAVA_EXCEPTION") {
					$$('#_integrate_info').html('服务端请求处理发生问题,请联系系统管理员.');
				} else if(!data.state && data.code == "SHOW_MSG") {
					$$('#_integrate_info').html(data.info + ".");
				} else if(!data.state && data.code == "CHARACTER_WRONGFUL") {
					$$('#_integrate_info').html('您提交的数据中含有非法字符(\'<>),请调整后继续.');
				} else if(!data.state && data.code == "NOT_LOGINED") {
					document.location.href = 'index.html';
				} else if(data.state) {
					//console.log(data.info);
					tool.setUser(data.info);
					document.location.href = 'home.html';
				} else {
					$$('#_integrate_info').html("发送未知异常,请联系系统管理员.");
				}
			},
			error: function(xhr, status) {
				if(status == 'timeout') {
					$$('#_integrate_info').html("服务器处理过程响应超时,请稍后重试.");
				} else {
					$$('#_integrate_info').html("服务器处理过程发生问题,错误状态码：" + status);
				}
			}
		});
	}
});