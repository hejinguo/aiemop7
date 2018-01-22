define(['app','tool','cust/custView'],function(app,tool,custView){
	
	var $$ = Dom7;
	var loading = false;
	var param = {custName:'',pageNum:1,pageSize:10};
	var bindings = [{
		element: '.cust-page .searchbar',
		event: 'submit',
		handler: searchUnitItem
	},{
		element: '.cust-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshUnitItem
	},{
		element: '.cust-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteUnitItem
	}];
	
	function init(){
		custView.render(bindings);
		param.custName = '';
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	
	function searchUnitItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.cust-page .searchbar [type="search"]');
		searchInputBox.blur();
		app.f7.showIndicator();
		param.custName = searchInputBox.val();
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	
	function refreshUnitItem(){
		app.f7.showIndicator();
		param.pageNum = 1;
		_pullupRefresh(1,function(){
			app.f7.pullToRefreshDone('.cust-page .pull-to-refresh-content');
		});
	}
	
	function infiniteUnitItem(){
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
			tool.appAjax(tool.appPath.emopPro+'cust/list',param,function(data){
				loading = false;
				if(data.state){
					if(1 == type){
						custView.refresh(data.info.list);
						onCallback();
					}else{
						custView.append(data.info.list);
					}
//					app.toast('暂不支持!', 'warning').show(true);
					app.toast.show('共'+data.info.total+'条记录,已加载'+(data.info.hasNextPage ? param.pageNum*param.pageSize+'条' : '完毕'));
					if(data.info.hasNextPage){
						app.f7.attachInfiniteScroll($$('.cust-page .infinite-scroll'));//还有更多数据
						param.pageNum++;
					}else{
						app.f7.detachInfiniteScroll($$('.cust-page .infinite-scroll'));//加载完毕
					}
				}
			},function(){
//				app.f7.attachInfiniteScroll($$('.cust-page .infinite-scroll'));//还有更多数据
			},function(){
				app.f7.hideIndicator();
			});
		}, 500);
	}

	return {
		init: init
	};
});