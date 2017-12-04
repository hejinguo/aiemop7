//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['tool'],function(tool){
	var $$ = Dom7;
	
	function init(query){
		$$('.shop-detail-page-navbar-inner .center').html(query.entName);
		setTimeout(function(){
			loadShopInfoInfo(query);
		},500);
	}
	
	function loadShopInfoInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				require(['shop/detail/detailView'], function(detailView) {
					detailView.render({model:data.info[0]});
				});
			}
		},function(){
			
		},function(){
//			app.f7.hideIndicator();
		});
	}
	
	return {
		init: init
	};
});