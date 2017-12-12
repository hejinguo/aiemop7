//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.shop-detail-page-navbar-inner .right a',
		event: 'click',
		handler: clickModifyShopItem
	},{
		element: '.shop-detail-page .delete-shop-button',
		event: 'click',
		handler: clickDeleteShopItem
		
	}];
	var shopCache = null;
	
	function init(query){
		setTimeout(function(){
			shopCache = query;
			loadShopDetailInfo(query);
		},500);
	}
	
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				require(['shop/detail/detailView'], function(detailView) {
					if(data.info[0].ENT_IMAGE){
						data.info[0].ENT_IMAGE = tool.appPath.emop + 'cust/getShopImage?entCode=' + data.info[0].ENT_IMAGE+"&k="+new Date().getTime();
					}
					detailView.render({model:data.info[0],bindings:bindings,callback:loadShopIndividualInfo});
				});
			}
		});
	}
	
	function clickModifyShopItem(){
		app.views[1].router.load({url:'pages/shop/shop-save.html?entCode='+shopCache.entCode+'&editFlag='+shopCache.editFlag});
	}
	
	function clickDeleteShopItem(){
		if(shopCache.editFlag && shopCache.editFlag == 1){
			app.f7.confirm('您确定要删除该商铺吗?','删除',function () {
		        tool.appAjax('cust/delShopInfo',{shopCode:shopCache.entCode},function(data){
		        	if(data.state){
						app.toast.show("删除商铺操作成功.");
						app.views[1].router.back({pageName:'shop'});
						app.router.load('shop');
					}
				});
		    });
		}else{
			app.f7.alert('对不起,您无权执行删除操作.');
		}
	}
	
	function loadShopIndividualInfo(entCode,typeCode){
		tool.appAjax('cust/getExpandShopInfo',{entCode:entCode,typeId:typeCode},function(data){
			var individual = "";
			if(data.state && data.info.length > 0){
				individual = "<div class=\"row\">";
				$$.each(data.info, function (index, item) {
					individual += "<div class=\"col-50\">"+item.K_NAME+"："+(item.K_VALUE ? item.K_VALUE : '不详')+"</div>";
				});
				individual += "</div>";
			}else{
				individual = "无个性化信息";
			}
			$$('.shop-detail-individual-card .card-content-inner').html(individual);
		});
	}
	
	return {
		init: init
	};
});