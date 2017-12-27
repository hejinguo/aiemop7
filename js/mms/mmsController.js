define(['app','mms/mmsView'],function(app,mmsView){
	
	function init(){
		var owner = {rank:2,name:'南充',value:'90%'};
		var ranks = [{rank:1,name:'成都',value:'95%'},
					{rank:2,name:'南充',value:'90%'},
					{rank:3,name:'德阳',value:'88%'},
					{rank:19,name:'广元',value:'35%'},
					{rank:20,name:'阿坝',value:'29%'},
					{rank:21,name:'甘孜',value:'22%'}
		];
		var testData = [];
		testData.push({title:'4G客户渗透率',owner:owner,ranks:ranks});
		testData.push({title:'工作手机发展目标完成率',owner:owner,ranks:ranks});
		testData.push({title:'行业终端目标完成率',owner:owner,ranks:ranks});
		testData.push({title:'和商务当日目标任务完成率',owner:owner,ranks:ranks});
		testData.push({title:'专线当日净增数',owner:owner,ranks:ranks});
		testData.push({title:'互联网专线当日净增数',owner:owner,ranks:ranks});
		setTimeout(function() {
			mmsView.render({model:testData});
		},500);
	}
	
	return {
		init: init
	};
});