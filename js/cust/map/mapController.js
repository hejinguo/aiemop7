define(['app','tool','cust/map/mapView','coordtransform'],function(app,tool,mapView,coordtransform) {
	var $$ = Dom7;
	var custInfo = {};
	var bindings = [{
		element: '.cust-map-page .floating-button',
		event: 'click',
		handler: clickFloatingButton
	}];
	
	function init(query) {
		$$('.cust-map-page-title').html('正在加载');
		setTimeout(function(){
			loadCustDetailInfo(query);
		},500);
	}
	
	function loadCustDetailInfo(query){
		tool.appAjax(tool.appPath.emopPro+'cust/get',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				custInfo = data.info;
				$$('.cust-map-page-title').html(custInfo.custName);
				//将数据库中WGS84定位格式数据转换为用于百度定位的经纬度
				var bd09 = coordtransform.wgs84tobd09(custInfo.longitude,custInfo.latitude);
				custInfo.longitude = bd09[0];
				custInfo.latitude = bd09[1];
				mapView.render({model:custInfo,bindings:bindings});
			}
		});
	}
	
	function clickFloatingButton(){
		var buttons = [
	        {
	            text: '我已找到企业立即完成匹配',
//	            bold: true,
	            onClick: function () {
	            	app.view.loadPage("pages/cust/cust-unit.html?custSeqid="+custInfo.custSeqid+"&custName="+custInfo.custName);
	            }
	        },
	        {
	            text: '我未找到企业立即删除记录',
	            color: 'red',
	            onClick: function () {
	                app.f7.confirm('请确认在地图标识附近您不能找到时,才应该继续完成此次删除操作!<br/>注意删除操作目前暂不支持撤销！',function(){
	                	app.f7.showIndicator();
						tool.appAjax(tool.appPath.emopPro+'cust/cancel',{custSeqid:custInfo.custSeqid},function(data){
				        	if(data.state){
								app.view.router.back({pageName:'cust',force:true});
								app.router.load('cust');
							}
						});
					});
	            }
	        },
	    ];
	    app.f7.actions(buttons);
	}
	
	return {
		init: init
	};
});