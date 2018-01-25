//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-detail-page .delete-cust-button',
		event: 'click',
		handler: clickDeleteCustItem
		
	}];
	var shopCache = null;
	
	function init(query){
		setTimeout(function(){
			shopCache = query;
			loadCustDetailInfo(query);
		},500);
	}
	
	function loadCustDetailInfo(query){
		tool.appAjax(tool.appPath.emopPro+'cust/get',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				require(['cust/detail/detailView'], function(detailView) {
					if(data.info.images && data.info.images.length > 0){
						$$.each(data.info.images, function (index, element) {
						    element.imageName = tool.appPath.emopPro + 'cust/getShopImage?custSeqid=' + element.custSeqid+"&fileName="+element.imageName+"&k="+new Date().getTime();
						});    
					}
					detailView.render({model:data.info,bindings:bindings});
				});
			}
		});
	}
	
	function clickDeleteCustItem(){
		app.f7.alert('对不起,您无权执行删除操作.');
		/*
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
		*/
	}
	
	return {
		init: init
	};
});