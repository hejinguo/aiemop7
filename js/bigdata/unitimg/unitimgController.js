//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['tool'],function(tool){
	var $$ = Dom7;
	
	function init(query){
		setTimeout(function(){
			loadUnitImgInfo(query);
		},500);
	}
	
	function loadUnitImgInfo(query){
		tool.appAjax(tool.appPath.work+'report/getUnitInfo',{unitId : query.unitId},function(data){
			if(data.state){
				require(['bigdata/unitimg/unitimgView'], function(unitimgView) {
					unitimgView.render({model:JSON.parse(data.info.content)});
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