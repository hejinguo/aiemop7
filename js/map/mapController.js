define(['app','map/mapView'],function(app,mapView) {
	var $$ = Dom7;

	function init() {
		mapView.render();
	}
	
	return {
		init: init
	};
});