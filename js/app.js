require.config({
	paths: {
		base64: '../lib/base64',
		text: '../lib/requirejs-plugins/text',
		async: '../lib/requirejs-plugins/async',
		echarts: '../lib/echarts/echarts.common.min',
		BMap: 'http://api.map.baidu.com/api?v=2.0&ak=sBRRXwEWp4MoUmugUZ5tBfVe1hrQyyZg'
	},
	shim: {
		base64: {
			exports: "Base64"
		}
	}
});

define(['router'], function(router) {
	var $$ = Dom7;
	
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	router.init();
	console.log("初始化APP路由结束");
	var f7 = new Framework7({
		modalTitle: '消息',
		animateNavBackIcon: true,
		pushState:true,
		onAjaxStart: function (xhr) {
			console.log("load page onAjaxStart");
	        f7.showIndicator();
	    },
	    onAjaxComplete: function (xhr) {
	    	console.log("load page onAjaxComplete");
	        f7.hideIndicator();
	    }
	});
	console.log("初始化View启动");
	// Add views
	var views = new Array();
	views.push(f7.addView('#home-view',{dynamicNavbar: true}));
	views.push(f7.addView('#shop-view',{dynamicNavbar: true,domCache: true}));
	views.push(f7.addView('#bigdata-view',{dynamicNavbar: true}));
	views.push(f7.addView('#tool-view'));
	console.log("初始化View结束");
	console.log("初始化APP过程结束");
	
	return {
		f7: f7,
		views: views,
		router: router,
		toast: f7.toast('', '', {duration:2000})
	};
});