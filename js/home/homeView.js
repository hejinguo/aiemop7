define(['app'], function(app) {//'text!home/home-page-content.tpl'
	var $$ = Dom7;

	function render(params) {
//		$$('.home-page .page-content .page-pull-content').html(Template7.compile(template)({bigdatas:new Array(20)}));
		require(['async!BMap'], function() {
			var map = new BMap.Map($$('.home-page .page-content .page-pull-content')[0]);// 创建地图实例
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
//				console.log(BMAP_STATUS_SUCCESS);
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					console.log('您的位置：'+r.point.lng+','+r.point.lat);
//					map.addControl(new BMap.GeolocationControl());
					var point = new BMap.Point(r.point.lng, r.point.lat);
					var label = new BMap.Label('成都中航信虹科技股份有限公司',{position:point,offset:{width:10,height:-22}});
					map.addOverlay(label);
					var marker = new BMap.Marker(point);// 创建标注
					map.addOverlay(marker);// 将标注添加到地图中
					map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
					marker.addEventListener("click", function(){    
//					    app.f7.alert("稍等，马上调到查看集团。");
					    var opts = {
						    width : 250,     // 信息窗口宽度
						    height: 100,     // 信息窗口高度
						    title : "<b>成都中航信虹科技股份有限公司</b>"  // 信息窗口标题
						}    
						var infoWindow = new BMap.InfoWindow("集团价值：A+<br/>集团编码：2802525152<br/>集团地址：未知<br/><a href='javascript:void(0);'>查看集团更多信息</a>", opts);  // 创建信息窗口对象    
						map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
					}); 
				}else {
					console.log('failed'+this.getStatus());
				}        
			});
//				map.addOverlay(new BMap.Label('1122334455',{position:point}));// 将标注添加到地图中
		});
	}

	return {
		render: render
	};
});