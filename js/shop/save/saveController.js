//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.shop-save-page-navbar-inner .right a',
		event: 'click',
		handler: clickSaveShopItem
	}];
	
	function init(query){
		if(query.entCode){
			$$('.shop-save-page-navbar-inner .center').html('编辑商铺('+query.entName+')');
			loadShopDetailInfo(query);
		}else{
			$$('.shop-save-page-navbar-inner .center').html('添加商铺');
		}
		require(['shop/save/saveView'], function(saveView) {
			saveView.render({bindings:bindings});
		});
	}
	
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				app.f7.formFromData($$('.shop-save-page form'),data.info[0])
			}
		});
	}
	
	function clickSaveShopItem(){
		
//		console.log(app.f7.formToData($$('.shop-save-page form')));
		app.f7.alert(JSON.stringify(app.f7.formToData($$('.shop-save-page form'))));
		
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