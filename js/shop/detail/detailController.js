//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['tool'],function(tool){
	var $$ = Dom7;
	
	function init(query){
		$$('.shop-detail-page-navbar-inner .center').html(query.entName);
		setTimeout(function(){
			loadShopDetailInfo(query);
		},500);
	}
	
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				require(['shop/detail/detailView'], function(detailView) {
					if(data.info[0].ENT_IMAGE){
						data.info[0].ENT_IMAGE = tool.appPath.emop + 'cust/getShopImage?entCode=' + data.info[0].ENT_IMAGE;
					}
					detailView.render({model:data.info[0],callback:loadShopIndividualInfo});
				});
			}
		});
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