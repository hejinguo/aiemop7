define(['tool','base64'],function(tool,base64) {
	var $$ = Dom7;

	/**
	 * Init router, that handle page events
	 */
    function init() {
    	$$('.no-complete').click(function(){
			require(['app'], function(app) {
//				app.f7.alert('对不起,您当前操作的功能尚未开放.');
				app.toast.show('对不起,您当前操作的功能尚未开放.');
			});
			return false;
		});
    	
    	//重置登陆状态,保证每次都需要用户重新登陆
//  	sessionStorage.removeItem("_USER_BASE_INFO");
    	//界面核心框架加载成功后渲染后台数据到页面
		$$(document).on('page:beforeinit', function (e) {
			var page = e.detail.page;
			var pageTitle = $$("[data-page='"+page.name+"']")[1].dataset.pageTitle;
//			console.log("1:pageTitle="+pageTitle);
			if(page.name.indexOf('smart-select-radio') >= 0){
				console.log('忽略 '+e.detail.page.name+' 页面标题更新')
			}else if(!pageTitle){
				console.log('忽略 '+page.name+' 页面标题更新')
			}else{
				tool.setDocumentTitle(pageTitle);
			}
//			单独来分享类(page.query['_he_share'] ? 'T' : 'F')(T),后台封装时填充框架,参数仅仅区分是否封装,是否必须登陆访问由数据配置决定
//			不属于分享类(page.query['_he_share'] ? 'T' : 'F')(F),后台不需要填充框架且必须登录才能访问
//			思路二：由H5制作工具生成模板样式一致的两套页面(cust.html cust-share.html)
			//验证用户是否已经登录
			var user = tool.getUser();
			if(user.lastLoginToken){
				$$('.login-screen').remove();
			}
			if(user.lastLoginToken || page.name == 'login'){
				load(page.name, page.query);
			}
		});
		$$(document).on('page:reinit', function (e) {
			var page = e.detail.page;
			var pageTitle = $$("[data-page='"+page.name+"']")[0].dataset.pageTitle;
//			console.log("2:pageTitle="+pageTitle);
			if(page.name.indexOf('smart-select-radio') >= 0){
				console.log('忽略 '+page.name+' 页面标题更新')
			}else if(!pageTitle){
				console.log('忽略 '+page.name+' 页面标题更新')
			}else{
				tool.setDocumentTitle(pageTitle);
			}
		});
    }

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
	 */
	function load(pageName, query) {
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