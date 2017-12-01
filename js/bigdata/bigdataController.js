define(['app','tool','bigdata/bigdataView'],function(app,tool,bigdataView){
	var $$ = Dom7;
	var loading = false;
	var param = {unitIdName:'',pageNum:1,pageSize:10};
	var bindings = [{
		element: '.bigdata-page .searchbar',
		event: 'submit',
		handler: searchUnitItem
	},{
		element: '.bigdata-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshUnitItem
	},{
		element: '.bigdata-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteUnitItem
	}];
	
	function init(){
		bigdataView.render(bindings);
		_pullupRefresh(1);
	}
	
	function searchUnitItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.bigdata-page .searchbar [type="search"]');
		searchInputBox.blur();
		param.unitIdName = searchInputBox.val();
		app.f7.showIndicator();
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	
	function refreshUnitItem(){
		app.f7.showIndicator();
//		setTimeout(function () {
		param.pageNum = 1;
		_pullupRefresh(1);
      	app.f7.pullToRefreshDone('.bigdata-page .pull-to-refresh-content');
//	    },500);
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
	function _pullupRefresh(type) {
		setTimeout(function() {
			tool.appAjax(tool.appPath.work+'report/getUnitList',param,function(data){
				loading = false;
				if(data.state){
					if(1 == type){
						bigdataView.refresh(data.info.list);
					}else{
						bigdataView.append(data.info.list);
					}
					app.toast.show('共'+data.info.total+'条记录,已加载'+(data.info.hasNextPage ? param.pageNum*param.pageSize+'条' : '完毕'));
					if(data.info.hasNextPage){
						app.f7.attachInfiniteScroll($$('.bigdata-page .infinite-scroll'));//还有更多数据
						param.pageNum++;
					}else{
						app.f7.detachInfiniteScroll($$('.bigdata-page .infinite-scroll'));//加载完毕
					}
				}
			},function(){
//				app.f7.attachInfiniteScroll($$('.bigdata-page .infinite-scroll'));//还有更多数据
			},function(){
				app.f7.hideIndicator();
			});
		}, 500);
	}
	
	return {
		init: init
	};
});