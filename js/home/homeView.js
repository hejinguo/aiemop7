define(['text!home/home-page-content.tpl'], function(template) {
	var $$ = Dom7;

	function render(params) {
		$$('.home-page .page-content').html(Template7.compile(template)({bigdatas:new Array(20)}));
		//bindEvents(params.bindings);
	}

//	function bindEvents(bindings) {
//		initSwiper();
//		for (var i in bindings) {
//			$$(bindings[i].element).off(bindings[i].event);
//			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
//		}
//	}
	
//	function initSwiper(){
//		var mainSwiperCommonFunction = function(swiper){
//			if(swiper.activeIndex == 0){
//				$$('.view-main .navbar-inner .center').html('任务监控');
//				$$('.view-main .navbar-inner .right a').removeClass('hejg-hidden');
//			}else{
//				$$('.view-main .navbar-inner .center').html('常用工具');
//				$$('.view-main .navbar-inner .right a').addClass('hejg-hidden');
//			}
//		}
//		var mySwiper = new Swiper('.main-page .swiper-container',{
//			pagination:'.main-page .swiper-pagination',
//			onInit: function(swiper){
//				mainSwiperCommonFunction(swiper);
//			},
//			onSlideChangeEnd: function(swiper){
//		    	mainSwiperCommonFunction(swiper);
//		    }
//		});
//	}

	return {
		render: render
	};
});