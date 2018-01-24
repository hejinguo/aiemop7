define(['app','text!cust/detail/detail-page-content.tpl?v=122'], function(app,template) {
	var $$ = Dom7;

	function render(params) {
		$$('.cust-detail-page .page-pull-content').html(Template7.compile(template)(params.model));
//		params.callback(params.model.ENT_CODE,params.model.TYPE_CODE);
		bindEvents(params.bindings);
		if(params.model.longitude && params.model.latitude){
			require(['async!BMap'], function() {
				var map = new BMap.Map($$('.cust-detail-page .cust-detail-map-card div')[0]);// 创建地图实例
			    var point = new BMap.Point(params.model.longitude, params.model.latitude); // 创建点坐标
			    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
			    var marker = new BMap.Marker(point);// 创建标注  
				map.addOverlay(marker);// 将标注添加到地图中
				map.addControl(new BMap.GeolocationControl());
			});
		}
	}
	
	function bindEvents(bindings) {
		for (var i in bindings) {
			$$(bindings[i].element).off(bindings[i].event);
			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
//			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	return {
		render: render
	};
});