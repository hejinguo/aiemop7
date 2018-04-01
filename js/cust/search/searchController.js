define(['app','tool','cust/search/searchView'],function(app,tool,searchView){
	
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-search-page .cust-search-button',
		event: 'click',
		handler: searchCustItem
	},{
		element: '.cust-search-page .cust-reset-button',
		event: 'click',
		handler: resetCustItem
	}];
	
	function init(query){
		app.f7.formFromData($$('.cust-search-page form'), query);
		searchView.render(bindings);
	}
	
	function searchCustItem(){
		app.f7.showIndicator();
		var formData = app.f7.formToData($$('.cust-search-page form'));
//		formData.createNo = formData.createNo && formData.createNo.length > 0 ? 'T' : '';
//		formData.serviceNo = formData.serviceNo && formData.serviceNo.length > 0 ? 'T' : '';
		app.router.load('cust',formData);
		app.f7.closePanel();
	}
	
	function resetCustItem(){
		app.f7.showIndicator();
		var formData = {custCode:'',custName:'',custAddr:'',ifMatch:'',radius:'1000'};//,ifLocation:'',createNo:'',serviceNo:''
		app.f7.formFromData($$('.cust-search-page form'), formData);
		app.router.load('cust',formData);
		app.f7.closePanel();
	}
	
	return {
		init: init
	};
});