define(['app','tool','user/userView'],function(app,tool,userView){
	
	var $$ = Dom7;
	var loading = false;
	var param = {};
	var bindings = [{
		element: '.user-page .searchbar',
		event: 'submit',
		handler: searchUserItem
	},{
		element: '.user-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshUserItem
	},{
		element: '.user-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteUserItem
	}];
	
	function init(query){
		param.pageNum = 1;
		param.pageSize = 10;
		userView.render(bindings);
		_pullupRefresh(1);
	}
	
	function searchUserItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.user-page .searchbar [type="search"]');
		searchInputBox.blur();
		app.f7.showIndicator();
		param.staffName = searchInputBox.val();
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	
	function refreshUserItem(){
		app.f7.showIndicator();
		param.pageNum = 1;
		_pullupRefresh(1,function(){
			app.f7.pullToRefreshDone('.user-page .pull-to-refresh-content');
		});
	}
	
	function infiniteUserItem(){
		app.f7.showIndicator();
		if (loading) return;
		loading = true;
		_pullupRefresh(2);
	}
	
	/**
	 * 上拉加载更多数据
	 */
	function _pullupRefresh(type,callback) {
		var onCallback = arguments[1]?arguments[1]:function(){};//数据加载完毕后的回调函数
		setTimeout(function() {
			tool.appJson(tool.appPath.emopPro+'user/parent',JSON.stringify(param),function(data){
				console.log(data);
				loading = false;
				if(data.state){
					data.info.emopPro = tool.appPath.emopPro;
					if(1 == type){
						userView.refresh(data.info);
						onCallback();
					}else{
						userView.append(data.info);
					}
//					app.toast('暂不支持!', 'warning').show(true);
					app.toast.show('共'+data.info.total+'条记录,已加载'+(data.info.hasNextPage ? param.pageNum*param.pageSize+'条' : '完毕'));
					if(data.info.hasNextPage){
						app.f7.attachInfiniteScroll($$('.user-page .infinite-scroll'));//还有更多数据
						param.pageNum++;
					}else{
						app.f7.detachInfiniteScroll($$('.user-page .infinite-scroll'));//加载完毕
					}
				}
			},function(){
//				app.f7.attachInfiniteScroll($$('.user-page .infinite-scroll'));//还有更多数据
			},function(){
				app.f7.hideIndicator();
			});
		}, 500);
	}
	
	return {
		init: init
	};
});