require.config({
	paths: {
		text: '../lib/requirejs-plugins/text',
		async: '../lib/requirejs-plugins/async',
		echarts: '../lib/echarts/echarts.common.min',
		jquery: '../lib/common/jquery.min',
		base64: '../lib/common/base64',
		coordtransform: '../lib/common/coordtransform',
		//		BMap: 'https://api.map.baidu.com/api?v=3.0&ak=sBRRXwEWp4MoUmugUZ5tBfVe1hrQyyZg'
		BMap: 'https://api.map.baidu.com/api?v=2.0&ak=sBRRXwEWp4MoUmugUZ5tBfVe1hrQyyZg'
	},
	shim: {
		base64: {
			exports: "Base64"
		}
	}
});

define(['tool', 'router'], function(tool, router) {
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
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	router.init();
	console.log("初始化APP路由结束");
	var f7 = new Framework7({
		cache: false,
		swipeBackPage: false,
		modalTitle: '消息',
		modalButtonOk: '确定',
		modalButtonCancel: '取消',
		//		pushState:true,
		//		animateNavBackIcon: true,
		//		pushStateNoAnimation:true,
		//		smartSelectBackText:'返回',
		onPageBack: function(f7, page) {
			f7.closePanel();
			f7.closeModal();
		},
		onAjaxStart: function(xhr) {
			console.log("load page onAjaxStart");
			f7.showIndicator();
		},
		onAjaxComplete: function(xhr) {
			console.log("load page onAjaxComplete");
			f7.hideIndicator();
		}
	});
	console.log("初始化View启动");
	var view = f7.addView('.view-main', {
		domCache: true,
		dynamicNavbar: true
	});
	var right = f7.addView('.view-right', {
		animatePages: false,
		reloadPages: true
	});
	console.log("初始化View结束");
	console.log("初始化APP过程结束");

	var workToken = getQueryString('token');
	var targetModule = getQueryString('module') ? getQueryString('module') : 'bigdata'; //指定加载某个具体的模块,而不是直接跳转的方式到首页
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
					$$('#_integrate_info').html('未找到您集成有ESOP系统的账户信息.');
				} else if(data.state) {
					tool.setUser(data.info);
					view.router.loadPage('pages/'+targetModule+'/'+targetModule+'.html?integrate=true');
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

	return {
		f7: f7,
		view: view,
		right: right,
		router: router,
		toast: f7.toast('', '', {
			duration: 2000
		})
	};
});