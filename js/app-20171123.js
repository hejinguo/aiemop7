/*
require.config({
	paths: {
		handlebars: "lib/handlebars",
		text: "lib/text",
		hbs: "lib/hbs"
	},
	shim: {
		handlebars: {
			exports: "Handlebars"
		}
	}
});*/
require.config({
	paths: {
		text: "../lib/text"
	}
});
define('app', ['router'], function(Router) {
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	Router.init();
	console.log("初始化APP路由结束");
	var f7 = new Framework7({
		modalTitle: 'F7',
		animateNavBackIcon: true,
//		pushState:true,
//		onAjaxStart: function (xhr) {
//	        f7.showIndicator();
//	    },
//	    onAjaxComplete: function (xhr) {
//	        f7.hideIndicator();
//	    }
	});
	console.log("初始化ViewMain启动");
	var mainView = f7.addView('.view-main', {
		dynamicNavbar: true
	});
	console.log("初始化ViewMain结束");
	console.log("初始化APP过程结束");
	return {
		f7: f7,
		mainView: mainView,
		router: Router
	};
});