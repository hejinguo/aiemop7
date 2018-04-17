define(['app','tool','home/homeView'],function(app,tool,homeView) {
	var $$ = Dom7;
	var tempIcon = 'images/temp/timg.jpg';
	var bindings = [{
		element: '.home-page .home-person-icon [type="file"]',
		event: 'change',
		handler: selectIconPhoto
	},{
		element: '.home-page .home-person-icon img',
		event: 'click',
		handler: function(){$$('.home-page .home-person-icon [type="file"]').click();}
	},{
		element: '.home-page .home-person-info .home-person-signed',
		event: 'click',
		handler: clickSignedButton
	}]

	function init() {
//		app.f7.addNotification({
//	        title: '系统公告',
//	        message: '亲爱的用户您好,智慧政企移动办公管家目前已为您开放了‘商铺管理’、‘大数据报告’功能,其他功能我们开发人员正在紧锣密鼓的赶制中,请关注后续发布的系统公告。'
//	    });
//	    app.f7.alert('<div class="aui-text-left">亲爱的用户您好,智慧政企移动办公管家目前已为您开放了‘集团建档纳管’、‘商铺管理’、‘大数据报告’功能,其他功能我们开发人员正在紧锣密鼓的赶制中,请关注后续发布的系统公告。</div>','系统公告');
		
		homeView.render({bindings: bindings,model:tool.getUser()});
	}
	
	/**
	 * 点击签到按钮的处理事件
	 */
	function clickSignedButton(){
		app.f7.showIndicator();
		tool.appAjax(tool.appPath.emopPro+'base/signed/record',{},function(data){
			if(data.state){
				var user = tool.getUser();
				user.signed = true;
				tool.setUser(user);
				homeView.refresh(user);
				app.toast.show('签到操作成功');
			}
		},function(){
			
		},function(){
			app.f7.hideIndicator();
		});
	}
	
	/**
	 * 选择用户头像触发事件
	 */
	function selectIconPhoto(){
		var _this = this;
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
			app.f7.showIndicator();
			tool.dealImage(window.URL.createObjectURL(photo), {width:120,height:120,quality:1}, function(base) {
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
				tool.appAjax(tool.appPath.emopPro+'base/h5/saveIcon',{image:base},function(data){
					if(data.state){
						$$('.home-page .home-person-icon img').attr('src',base);
					}
				},function(){
					_this.value = '';
				},function(){
					app.f7.hideIndicator();
				});
			});
		}else{
//			$$('.home-page .home-person-icon img').removeAttr('src');
			$$('.home-page .home-person-icon img').attr('src',tempIcon);
		}
	}
	
	return {
		init: init
	};
});