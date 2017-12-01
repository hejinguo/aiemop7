define(['text!client/client-page-content.tpl'], function(template) {
	var $$ = Dom7;

	function render(params) {
		$$('.client-page .page-pull-content').html(Template7.compile(template)(params.model));
		bindEvents(params.bindings);
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$$(bindings[i].element).off(bindings[i].event);
			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		render: render
	};
});