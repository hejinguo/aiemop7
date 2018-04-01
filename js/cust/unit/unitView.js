define(['app','text!cust/unit/unit-page-content.tpl'], function(app,template) {
	var $$ = Dom7;

	function render(bindings) {
		bindEvents(bindings);
	}
	
	function refresh(model) {
		$$('.cust-unit-page .page-pull-content').html('<ul></ul>');
		$$('.cust-unit-page .page-pull-content').scrollTop();
		$$('.cust-unit-page .page-pull-content ul').html(Template7.compile(template)(model));
	}
	
	function append(model){
		$$('.cust-unit-page .page-pull-content ul').append(Template7.compile(template)(model));
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
//			$$(bindings[i].element).off(bindings[i].event);
//			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			$$(document).off(bindings[i].event,bindings[i].element,bindings[i].handler);
			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	return {
		render: render,
		refresh: refresh,
		append: append
	};
});