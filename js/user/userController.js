define(['app','tool'],function(app,tool){
	
	function init(query){
		
		tool.appAjax(tool.appPath.emopPro+'user/parent',{pageNum:1,pageSize:10},function(data){
			console.log(data);
		});
		
	}
	
	return {
		init: init
	};
});