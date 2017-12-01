define(function(template) {
	var $$ = Dom7;

	function render(params) {
		bindEvents(params.bindings);
		$$('.login-screen-content .send-mark-button').removeClass('disabled');
		$$('.login-screen-content .submit-login-button').removeClass('disabled');
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