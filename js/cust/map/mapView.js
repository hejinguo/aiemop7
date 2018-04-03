define(['app'], function(app) {
	var $$ = Dom7;
	
	function render(params) {
		bindEvents(params.bindings);
		if(params.model.longitude && params.model.latitude){
			require(['async!BMap'], function() {
				var map = new BMap.Map($$('.cust-map-page .page-content .page-pull-content')[0]);// 创建地图实例
				map.addControl(new BMap.GeolocationControl());
			    var point = new BMap.Point(params.model.longitude, params.model.latitude); // 创建点坐标
			    map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
			    var marker = new BMap.Marker(point);// 创建标注  
				map.addOverlay(marker);// 将标注添加到地图中
				
//				map.addEventListener("click", function(e){    
//  				alert(e.point.lng + ", " + e.point.lat);    
//				});
//				var geoc = new BMap.Geocoder();    
//				map.addEventListener("click", function(e){        
//				    var pt = e.point;
//				    geoc.getLocation(pt, function(rs){
//				        alert(rs.address);
////				        var addComp = rs.addressComponents;
////				        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
//				    });        
//				});
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

//	function render(params) {
//		require(['async!BMap'], function() {
//			var geolocation = new BMap.Geolocation();
//			geolocation.getCurrentPosition(function(r){
//				if(this.getStatus() == BMAP_STATUS_SUCCESS){
//					console.log('您的位置：'+r.point.lng+','+r.point.lat);
//					var point = new BMap.Point(r.point.lng, r.point.lat);
//					var label = new BMap.Label('成都中航信虹科技股份有限公司',{position:point,offset:{width:10,height:-22}});
//					map.addOverlay(label);
//					var marker = new BMap.Marker(point);// 创建标注
//					map.addOverlay(marker);// 将标注添加到地图中
//					map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
//					marker.addEventListener("click", function(){    
//					    var opts = {
//						    width : 250,     // 信息窗口宽度
//						    height: 100,     // 信息窗口高度
//						    title : "<b>成都中航信虹科技股份有限公司</b>"  // 信息窗口标题
//						}    
//						var infoWindow = new BMap.InfoWindow("集团价值：A+<br/>集团编码：2802525152<br/>集团地址：未知<br/><a href='javascript:void(0);'>查看集团更多信息</a>", opts);  // 创建信息窗口对象    
//						map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
//					}); 
//				}else {
//					console.log('failed'+this.getStatus());
//				}        
//			});
//			map.addOverlay(new BMap.Label('1122334455',{position:point}));// 将标注添加到地图中
//		});
//	}

	return {
		render: render
	};
});