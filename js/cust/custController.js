define(['app','tool','cust/custView','coordtransform'],function(app,tool,custView,coordtransform){
	
	var $$ = Dom7;
	var loading = false;
	var param = {};
	var location = {};
	var bindings = [{
		element: '.cust-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshCustItem
	},{
		element: '.cust-page .infinite-scroll',
		event: 'infinite',
		handler: infiniteCustItem
	},{
		element: '.cust-page .list-block li',
		event: 'click',
		handler: clickCustInfoItem
	},{
		element: '.view[data-page="cust"] .location-btn',
		event: 'click',
		handler: function(){
			app.f7.showIndicator();
			geolocation(function(){
				refreshCustItem();
			});
		}
	}];
	
	function init(query){
		var qstring = "",tstring="";
		query = query || {};
		query.radius = query.radius ? query.radius : (param.radius ? param.radius : '1000');
		query.ifMatch = query.ifMatch ? query.ifMatch : (param.ifMatch ? param.ifMatch : 'F');
		$$.each(query,function(k,v){
			qstring += (v ? "&"+k+"="+v : '');
		});
		tstring += query.custCode ? ',集团编码('+query.custCode+')' : '';
		tstring += query.custName ? ',集团名称('+query.custName+')' : '';
		tstring += query.custAddr ? ',集团地址('+query.custAddr+')' : '';
		tstring += query.radius && query.radius >0 ? ",附近"+(query.radius<1000 ? query.radius+'米' : query.radius/1000+'公里') : '';
		switch (query.ifMatch){
			case "T":
				tstring += ",已匹配集团";
				break;
			case "F":
				tstring += ",未处理集团";
				break;
			case "Y":
				tstring += ",预建档集团";
				break;
			case "N":
				tstring += ",已删除集团";
				break;
			default:
				break;
		}
//		tstring += query.ifLocation ? (query.ifLocation == 'T' ? ',已定位集团' : ',未定位集团') : '';
//		tstring += query.serviceNo && query.serviceNo == 'T' ? ',我是客户经理' : '';
//		tstring += query.createNo && query.createNo == 'T' ? ',我创建的集团' : '';
		if(tstring){
			param = query;
			$$('.cust-page .pretend-search-input span').html(tstring.substring(1));//JSON.stringify(query)
			$$('.cust-page .pretend-search-input').attr('href','pages/cust/cust-search.html?'+qstring.substring(1));
		}else{
			param = {};
			$$('.cust-page .pretend-search-input span').html('请通过集团关键信息搜索');
			$$('.cust-page .pretend-search-input').attr('href','pages/cust/cust-search.html');
		}
		param.pageNum = 1;
		param.pageSize = 10;
//		custView.render(bindings);
		geolocation(function(){
			_pullupRefresh(1);
		});
	}
	
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
			param.longitude = location.longitude;
			param.latitude = location.latitude;
			tool.appJson(tool.appPath.emopPro+'cust/list',JSON.stringify(param),function(data){
				loading = false;
				if(data.state){
					if(1 == type){
						custView.refresh({radius:param.radius,list:data.info.list});
						onCallback();
					}else{
						custView.append({radius:param.radius,list:data.info.list});
					}
					custView.render(bindings);
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
	
	function clickCustInfoItem(e){
		var custInfo = $$(e.srcElement).parents('a')[0].dataset;
		if(custInfo.custSeqid && custInfo.ifMatch){
			switch (custInfo.ifMatch){
				case "F"://未处理的集团
					app.view.loadPage('pages/cust/cust-map.html?custSeqid='+custInfo.custSeqid);
					break;
				default:
					app.view.loadPage('pages/cust/cust-detail.html?custSeqid='+custInfo.custSeqid);
					break;
			}
		}
	}
	
	/**
	 * 获取当前定位信息
	 */
	function geolocation(callback){
//		app.f7.showIndicator();
		var onCallback = arguments[0]?arguments[0]:function(){};//定位完毕后的回调函数
		require(['async!BMap'], function() {
			$$('.cust-page-title').html('正在定位');
			new BMap.Geolocation().getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					//将百度定位的经纬度转换为用于数据库比对的WGS84定位格式数据
					var wgs84 = coordtransform.bd09towgs84(r.point.lng, r.point.lat);
					location.longitude = wgs84[0];
					location.latitude = wgs84[1];
					$$('.cust-page-title').html('获取地址');
					//创建地理编码实例并根据坐标得到地址描述 
					new BMap.Geocoder().getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
					    if (result){
							$$('.cust-page-title').html(result.address);
					    	onCallback();//定位成功的回调函数
//					    	app.f7.hideIndicator();
					    }
					});
				}else {
					privateGeolocationError(this.getStatus());
					app.f7.hideIndicator();
				}        
			});//,{timeout:10000,maximumAge:10000,enableHighAccuracy:true}
		});
	}
	
	/**
	 * 百度定位返回失败状态时候的处理函数
	 */
	function privateGeolocationError(status){
		switch (status){
			case BMAP_STATUS_TIMEOUT:
				app.toast.show(status+':定位过程超时,请稍后重试.');
				break;
			case BMAP_STATUS_SERVICE_UNAVAILABLE:
				app.toast.show(status+':定位服务不可用,请稍后重试.');
				break;
			case BMAP_STATUS_PERMISSION_DENIED:
				app.toast.show(status+':没有定位权限,请稍后重试.');
				break;
			case BMAP_STATUS_INVALID_REQUEST:
				app.toast.show(status+':非法定位请求,请稍后重试.');
				break;
			case BMAP_STATUS_UNKNOWN_ROUTE:
				app.toast.show(status+':导航结果未知,请稍后重试.');
				break;
			case BMAP_STATUS_UNKNOWN_LOCATION:
				app.toast.show(status+':位置结果未知,请稍后重试.');
				break;
			default://0:检索成功,1:城市列表,4:非法密钥
				app.toast.show(status+':定位过程异常,请稍后重试.');
				break;
		}
	}

	return {
		init: init
	};
});