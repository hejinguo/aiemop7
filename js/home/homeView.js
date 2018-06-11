define(['app', 'tool'], function(app, tool) {
	var $$ = Dom7;
	var tempIcon = 'images/temp/timg.jpg';

	function render(params) {
		bindEvents(params.bindings);
		refresh(params.model);
	}

	function refresh(model) {
		$$('.home-page .home-person-info .person-name').html(model.staffName + '(' + model.staffCode + ')');
		$$('.home-page .home-person-info .person-subinfo-organize').html(model.organize.orgName + (model.roles ? '_' + model.roles[0].roleName : ''));
		$$('.home-page .home-person-info .person-subinfo-phoneno').html(model.phoneNo);
		$$('.home-page .home-person-icon img').attr('src', model.photoAddr ? tool.appPath.emopPro + 'base/h5/getIcon?iconName=' + model.photoAddr : tempIcon);
		tool.marqueeNotice('.theme-asiainfo .marquee-notice-list', 2000);
		if(model.signed) {
			$$('.home-page .home-person-info .home-person-signed').addClass('disabled');
			$$('.home-page .home-person-info .home-person-signed').html('今日已签到');
		}

		console.log('app.f7.device.webView=' + app.f7.device.webView);

		$$.each(model.modules, function(index, module) {
			$$("[data-module-mark='" + module.moduleMark + "']").removeClass("aui-hidden");
		});
	}

	function bindEvents(bindings) {
		for(var i in bindings) {
			$$(bindings[i].element).off(bindings[i].event);
			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		refresh: refresh,
		render: render
	};
});