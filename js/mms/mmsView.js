define(['text!mms/mms-page-content.tpl'], function(template) {
	var $$ = Dom7;

	function render(params) {
		$$('.mms-page .page-pull-content').html(Template7.compile(template)(params.model));
	}
	
	return {
		render: render
	};
});