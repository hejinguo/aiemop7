define(['app','home/homeView'],function(app,homeView) {
	var $$ = Dom7;

	function init() {
		homeView.render();
	}
	
	return {
		init: init
	};
});