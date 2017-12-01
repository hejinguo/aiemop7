require.config({
	paths: {
		text: '../lib/text',
		base64: '../lib/base64',
		echarts:'../lib/echarts/echarts.common.min'
	},
	shim: {
		base64: {
			exports: "Base64"
		}
	}
});

define(['router'], function(Router) {
	var $$ = Dom7;
	
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	Router.init();
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
	views.push(f7.addView('#client-view',{dynamicNavbar: true}));
	views.push(f7.addView('#bigdata-view',{dynamicNavbar: true}));
	views.push(f7.addView('#tool-view'));
	console.log("初始化View结束");
	console.log("初始化APP过程结束");
	
	// Show/hide preloader for remote ajax loaded pages
	// Probably should be removed on a production/local app
//	$$(document).on('ajaxStart', function (e) {
//	    f7.showIndicator();
//	});
//	$$(document).on('ajaxComplete', function (e) {
//	    f7.hideIndicator();
//	});

	var toast = f7.toast('', '', {duration:2000});
	
	return {
		f7: f7,
		views: views,
		router: Router,
		toast: toast
	};
});