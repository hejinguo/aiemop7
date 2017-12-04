define(['app','tool','shop/shopView'],function(app,tool,shopView){
	var $$ = Dom7;
	var loading = false;
//	var param = {entCodeName:'',pageNum:1,pageSize:10};
	var param = {pageNo: 1,pageSize: 10,entName:'',orderCol: 'ent_state',orderDesc: 'DESC'};
	var bindings = [{
		element: '.shop-page .searchbar',
		event: 'submit',
		handler: searchShopItem
	},{
		element: '.shop-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshShopItem
	},{
		element: '.shop-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteShopItem
	}];
	
	function init(){
		shopView.render(bindings);
		_pullupRefresh(1);
	}
	
	function searchShopItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.shop-page .searchbar [type="search"]');
		searchInputBox.blur();
		app.f7.showIndicator();
		param.entName = searchInputBox.val();
//		param.entCodeName = searchInputBox.val();
		param.pageNo = 1;
		_pullupRefresh(1);
	}
	
	function refreshShopItem(){
		app.f7.showIndicator();
		param.pageNo = 1;
		_pullupRefresh(1,function(){
			app.f7.pullToRefreshDone('.shop-page .pull-to-refresh-content');
		});
	}
	
	function infiniteShopItem(){
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
			tool.appAjax('cust/getAllShopInfo',param,function(data){
				loading = false;
				if(data.state){
					if(1 == type){
						shopView.refresh(data.info.rows);
						onCallback();
					}else{
						shopView.append(data.info.rows);
					}
//					app.toast('暂不支持!', 'warning').show(true);
					/*
					app.toast.show('共'+data.info.total+'条记录,已加载'+(data.info.hasNextPage ? param.pageNum*param.pageSize+'条' : '完毕'));
					if(data.info.hasNextPage){
						app.f7.attachInfiniteScroll($$('.shop-page .infinite-scroll'));//还有更多数据
						param.pageNum++;
					}else{
						app.f7.detachInfiniteScroll($$('.shop-page .infinite-scroll'));//加载完毕
					}
					*/
					app.toast.show('共' + data.info.total + '条记录,已加载' + (param.pageNo * param.pageSize > data.info.total ? '完毕' : param.pageNo * param.pageSize + '条'));
					if(++param.pageNo > Math.ceil(data.info.total / param.pageSize)) {
						app.f7.detachInfiniteScroll($$('.shop-page .infinite-scroll'));//加载完毕
					} else {
						app.f7.attachInfiniteScroll($$('.shop-page .infinite-scroll'));//还有更多数据
					}
				}
			},function(){
//				app.f7.attachInfiniteScroll($$('.shop-page .infinite-scroll'));//还有更多数据
			},function(){
				app.f7.hideIndicator();
			});
		}, 500);
	}
	
	return {
		init: init
	};
});