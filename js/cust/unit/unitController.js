define(['app','tool','cust/unit/unitView'],function(app,tool,custView){
	
	var $$ = Dom7;
	var loading = false;
	var param = {};
	var custMatch = {};
	var bindings = [{
		element: '.cust-unit-page .searchbar',
		event: 'submit',
		handler: searchCustItem
	},{
		element: '.cust-unit-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshCustItem
	},{
		element: '.cust-unit-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteCustItem
	},{
		element: '.cust-unit-page .list-block li',
		event: 'click',
		handler: clickUnitInfoItem
	}];
	
	function init(query){
		custMatch.custSeqid = query.custSeqid;
		$$('.cust-unit-page .page-pull-content').css('background','url("'+tool.appPath.emopPro+'unit/waterMark")');
		param.pageNum = 1;
		param.pageSize = 10;
		custView.render(bindings);
		_pullupRefresh(1);
	}
	
	function searchCustItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.cust-unit-page .searchbar [type="search"]');
		searchInputBox.blur();
		app.f7.showIndicator();
		param.custName = searchInputBox.val();
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	
	function refreshCustItem(){
		app.f7.showIndicator();
		param.pageNum = 1;
		_pullupRefresh(1,function(){
			app.f7.pullToRefreshDone('.cust-unit-page .pull-to-refresh-content');
		});
	}
	
	function infiniteCustItem(){
		app.f7.showIndicator();
		if (loading) return;
		loading = true;
		_pullupRefresh(2);
	}
	
	function clickUnitInfoItem(e){
		var unitInfo = $$(e.srcElement).parents('a')[0].dataset;
		custMatch.custCode = unitInfo.custCode;
		if(custMatch.custSeqid && custMatch.custCode){
			app.f7.confirm("确定要与 "+unitInfo.custName+" 完成匹配?",function(){
				tool.appJson(tool.appPath.emopPro+'unit/match',JSON.stringify(custMatch),function(data){
					if(data.state){
						app.router.load('cust-detail',{custSeqid:custMatch.custSeqid});
						app.router.load('cust',{});
						app.f7.closePanel();
					}
				},function(){
	
				},function(){
					app.f7.hideIndicator();
				});
			});
		}
	}
	
	/**
	 * 上拉加载更多数据
	 */
	function _pullupRefresh(type,callback) {
		var onCallback = arguments[1]?arguments[1]:function(){};//数据加载完毕后的回调函数
		setTimeout(function() {
			tool.appJson(tool.appPath.emopPro+'unit/list',JSON.stringify(param),function(data){
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
						app.f7.attachInfiniteScroll($$('.cust-unit-page .infinite-scroll'));//还有更多数据
						param.pageNum++;
					}else{
						app.f7.detachInfiniteScroll($$('.cust-unit-page .infinite-scroll'));//加载完毕
					}
				}
			},function(){
//				app.f7.attachInfiniteScroll($$('.cust-unit-page .infinite-scroll'));//还有更多数据
			},function(){
				app.f7.hideIndicator();
			});
		}, 500);
	}
	
	return {
		init: init
	};
});