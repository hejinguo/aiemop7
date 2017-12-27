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
	/*var overscroll = function(el) {
	  el.addEventListener('touchstart', function() {
	    var top = el.scrollTop
	      , totalScroll = el.scrollHeight
	      , currentScroll = top + el.offsetHeight;
	    //If we're at the top or the bottom of the containers
	    //scroll, push up or down one pixel.
	    //
	    //this prevents the scroll from "passing through" to
	    //the body.
	    if(top === 0) {
	      el.scrollTop = 1;
	    } else if(currentScroll === totalScroll) {
	      el.scrollTop = top - 1;
	    }
	  });
	  el.addEventListener('touchmove', function(evt) {
	    //if the content is actually scrollable, i.e. the content is long enough
	    //that scrolling can occur
	    if(el.offsetHeight < el.scrollHeight)
	      evt._isScroller = true;
	  });
	}
	Dom7('.page-content')[0] && overscroll(Dom7('.page-content')[0]);
	Dom7('.page-pull-content')[0] && overscroll(Dom7('.page-pull-content')[0]);
	document.body.addEventListener('touchmove', function(evt) {
	  //In this case, the default behavior is scrolling the body, which
	  //would result in an overflow.  Since we don't want that, we preventDefault.
	  if(!evt._isScroller) {
	    evt.preventDefault();
	  }
	});*/
	
	/*
	var isAndroid = Framework7.prototype.device.android === true;
	var isIos = Framework7.prototype.device.ios === true;
	Template7.global = {
	    android: isAndroid,
	    ios: isIos
	};
	*/
	var $$ = Dom7;
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	router.init();
	console.log("初始化APP路由结束");
	var f7 = new Framework7({
		modalTitle: '消息',
//		animateNavBackIcon: true,
		pushState:true,
//		pushStateNoAnimation:true,
		cache:false,
//		smartSelectBackText:'返回',
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
	var view = f7.addView('.view-main',{domCache: true});
	var right = f7.addView('.view-right',{animatePages: false,reloadPages:true});
	console.log("初始化View结束");
	console.log("初始化APP过程结束");
	
	$$('.no-complete').click(function(){
		f7.alert('我们正紧锣密鼓开发中.');
		return false;
	});
	
	return {
		f7: f7,
		view: view,
		right: right,
		router: router,
		toast: f7.toast('', '', {duration:2000})
	};
});