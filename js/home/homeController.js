define(['app','home/homeView'],function(app,HomeView) {
	var $$ = Dom7;
//	var bindings = [{
//		element: '.pull-to-refresh-content',
//		event: 'refresh',
//		handler: refreshMonitorData
//	}];

	function init() {
//		var monitors = [
//			{title:'接口加载情况',badge:new Date().getSeconds(),text:'已经加载接口:500,尚未加载接口:500',addr:'pages/inter.html'},
//			{title:'任务执行情况',badge:new Date().getMilliseconds(),text:'正在执行:500,执行失败:500,执行成功:300',addr:'pages/task.html'},
//			{title:'报表加载情况',badge:'',text:'已经生成报表:500,尚未生成报表:500',addr:'pages/report.html'},
//			{title:'日检值班安排',badge:'',text:'昨日值班:张三三,今日值班:张三三,明日日检:李四',addr:'pages/daily.html'},
//		];
//		setTimeout(function () {
//			MainView.render({model: monitors, bindings: bindings});
//		},2000);
//		app.f7.initPullToRefresh('.main-page .pull-to-refresh-content');
		setTimeout(function () {
			HomeView.render();
		},2000);
//		$$('.tab-link').on('click', function (e) {
//			$$('.view-main .center').html($$(this).children('.tabbar-label').text());//tabbar-label
//		});
//		$$('[href="#tab3"]').click();
	}
	
//	function refreshMonitorData(e){
////		alert(this.dataset);
//		setTimeout(function () {
//			app.router.load('main');
//	      	app.f7.pullToRefreshDone();
//	    },2000);
//	}
	
	return {
		init: init
	};
});