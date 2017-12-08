define(['base64'],function(base64) {
	var $$ = Dom7;

	/**
	 * Init router, that handle page events
	 */
    function init() {
    	//重置登陆状态,保证每次都需要用户重新登陆
//  	sessionStorage.removeItem("_USER_BASE_INFO");
    	//界面核心框架加载成功后渲染后台数据到页面
		$$(document).on('page:beforeinit', function (e) {
			var page = e.detail.page;
			//验证用户是否已经登录
			var user = JSON.parse(base64.decode(sessionStorage.getItem("_USER_BASE_INFO")||'')||'{}');
			if(user.lastLoginToken){
				$$('.login-screen').remove();
			}
			if(user.lastLoginToken || page.name == 'login'){
				load(page.name, page.query);
			}
		});
    }

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
	 */
	function load(pageName, query) {
//		console.log(pageName.match(/smart-select-radio/gi);
		if(pageName.indexOf('smart-select-radio') >= 0){
			console.log('忽略 '+pageName+' 页面数据逻辑')
			return;
		}
		
		console.log("加载 "+pageName +" 页面数据逻辑");
		
		var controllerName = "";
		var splits = pageName.split("-");
		$$.each(splits, function(index, value) {
			controllerName += value+"/";
			if(index == splits.length-1){
				controllerName += value + 'Controller';
			}
		});

//		require([pageName + '/'+ pageName + 'Controller'], function(controller) {
		require([controllerName], function(controller) {
			controller.init(query);
		});
	}

	return {
        init: init,
		load: load
    };
});