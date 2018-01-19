define(['app','text!cust/cust-page-content.tpl'], function(app,template) {
	var $$ = Dom7;

	function render(bindings) {
		bindEvents(bindings);
	}
	
	function refresh(model) {
		$$('.bigdata-page .page-pull-content').html('<ul></ul>');
		$$('.bigdata-page .page-pull-content').scrollTop();
		$$('.bigdata-page .page-pull-content ul').html(Template7.compile(template)(model));
	}
	
	function append(model){
		$$('.bigdata-page .page-pull-content ul').append(Template7.compile(template)(model));
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
//			$$(bindings[i].element).off(bindings[i].event);
//			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	return {
		render: render,
		refresh: refresh,
		append: append
	};
});