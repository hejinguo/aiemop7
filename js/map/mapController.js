define(['app','map/mapView'],function(app,mapView) {
	var $$ = Dom7;

	function init() {
//		app.f7.onPageBeforeRemove('map',function(page){
		app.f7.onPageBack('map',function(page){
			app.f7.closePanel(false);
		});
		mapView.render();
	}
	
	return {
		init: init
	};
});