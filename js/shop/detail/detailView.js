define(['app','text!shop/detail/detail-page-content.tpl'], function(app,template) {
	var $$ = Dom7;

	function render(params) {
		$$('.shop-detail-page .page-pull-content').html(Template7.compile(template)(params.model));
		bindEvents(params.bindings);
	}
	
	function bindEvents(bindings) {
		for (var i in bindings) {
//			$$(bindings[i].element).off(bindings[i].event);
//			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	return {
		render: render
	};
});