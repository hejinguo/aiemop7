define(['app','tool'],function(app,tool) {
	var $$ = Dom7;

	function init() {
		app.f7.addNotification({
	        title: '系统公告',
	        message: '亲爱的用户您好,智慧政企移动办公管家目前已为您开放了‘商铺管理’、‘大数据报告’功能,其他功能我们开发人员正在紧锣密鼓的赶制中,请关注后续发布的系统公告。'
	    });
		
		var user = tool.getUser();
		$$('.home-page .home-person-info .person-name').html(user.staffName+'('+user.staffCode+')');
		$$('.home-page .home-person-info .person-subinfo span:first-child').html(user.organize.orgName+'_'+user.roles[0].roleName);
		$$('.home-page .home-person-info .person-subinfo span:last-child').html(user.phoneNo);
		tool.marqueeNotice('.theme-asiainfo .marquee-notice-list',2000);
	}
	
	return {
		init: init
	};
});