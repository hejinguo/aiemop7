define(function() {
	var $$ = Dom7;

	/**
	 * Init router, that handle page events
	 */
    function init() {
    	//重置登陆状态,保证每次都需要用户重新登陆
    	sessionStorage.removeItem("LOGIN_TOKEN");
    	//界面核心框架加载成功后渲染后台数据到页面
		$$(document).on('pageBeforeInit', function (e) {
			//验证用户是否已经登录
			var loginToken = sessionStorage.getItem("LOGIN_TOKEN");
			var page = e.detail.page;
			if(loginToken || page.name == 'login'){
				load(page.name, page.query);
			}
		});
    }

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
	 */
	function load(controllerName, query) {
		console.log("加载 "+controllerName +" 页面数据逻辑");
		require([controllerName + '/'+ controllerName + 'Controller'], function(controller) {
			controller.init(query);
		});
	}

	return {
        init: init,
		load: load
    };
});