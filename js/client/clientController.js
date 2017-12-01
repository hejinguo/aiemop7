define(['app','client/clientView'],function(app,clientView) {
	var $$ = Dom7;
	var bindings = [{
		element: '.client-page .pull-to-refresh-content',
		event: 'refresh',
		handler: refreshClientData
	}];

	function init() {
		
		setTimeout(function () {
			clientView.render({model: {}, bindings: bindings});
//			app.f7.pullToRefreshTrigger('.client-page .pull-to-refresh-content');
		},2000);
		
	}
	
	function refreshClientData(e){
//		alert(this.dataset);
		setTimeout(function () {
//			app.router.load('client');
			clientView.render({model: {}});
	      	app.f7.pullToRefreshDone('.client-page .pull-to-refresh-content');
	    },2000);
	}
	
	return {
		init: init
	};
});