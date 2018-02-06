define(['app','tool','cust/custView'],function(app,tool,custView){
	
	var $$ = Dom7;
	var loading = false;
	var param = {};
	var bindings = [/*{
		element: '.cust-page .searchbar',
		event: 'submit',
		handler: searchCustItem
	},*/{
		element: '.cust-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshCustItem
	},{
		element: '.cust-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteCustItem
	}];
	
	function init(query){
		var qstring = "",tstring="";
		query = query || {};
		$$.each(query,function(k,v){
			qstring += (v ? "&"+k+"="+v : '');
			//tstring += (v ? ","+v : '');
		});
		tstring += query.custCode ? ',集团编码('+query.custCode+')' : '';
		tstring += query.custName ? ',集团名称('+query.custName+')' : '';
		tstring += query.custAddr ? ',集团地址('+query.custAddr+')' : '';
		tstring += query.ifArchive ? (query.ifArchive == 'T' ? ',已建档集团' : ',未建档集团') : '';
		tstring += query.ifLocation ? (query.ifLocation == 'T' ? ',已定位集团' : ',未定位集团') : '';
		tstring += query.serviceNo && query.serviceNo == 'T' ? ',我创建的集团' : '';
		tstring += query.createNo && query.createNo == 'T' ? ',我是客户经理' : '';
		if(qstring){
			param = query;
			$$('.cust-page .pretend-search-input span').html(tstring.substring(1));//JSON.stringify(query)
			$$('.cust-page .pretend-search-input').attr('href','pages/cust/cust-search.html?'+qstring.substring(1));
		}else{
			param = {};
			$$('.cust-page .pretend-search-input span').html('请通过集团关键信息搜索');
			$$('.cust-page .pretend-search-input').attr('href','pages/cust/cust-search.html');
		}
//		console.log(query);
		param.pageNum = 1;
		param.pageSize = 10;
		custView.render(bindings);
		_pullupRefresh(1);
	}
	
	/*
	function searchCustItem(){
//		e.preventDefault(); // 阻止默认事件
		var searchInputBox = $$('.cust-page .searchbar [type="search"]');
		searchInputBox.blur();
		app.f7.showIndicator();
		param.custName = searchInputBox.val();
		param.pageNum = 1;
		_pullupRefresh(1);
	}
	*/
	
/*	function clickSearchItem(){
		app.right.loadPage('pages/cust/cust-search.html?custName=测试&serviceNo=F');
		app.f7.openPanel('right');
	}*/
	
	function refreshCustItem(){
		app.f7.showIndicator();
		param.pageNum = 1;
		_pullupRefresh(1,function(){
			app.f7.pullToRefreshDone('.cust-page .pull-to-refresh-content');
		});
	}
	
	function infiniteCustItem(){
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
			tool.appJson(tool.appPath.emopPro+'cust/list',JSON.stringify(param),function(data){
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