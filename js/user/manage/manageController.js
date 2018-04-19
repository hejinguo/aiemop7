define(['app','tool','jquery'],function(app,tool,$){
	var $$ = Dom7;
	var treeObj = null;
	
	function init(query){
//		console.log(tool.getUser());
		require(['../lib/ztree/jquery.ztree.core.min'], function() {
			treeObj = $.fn.zTree.init($("#user-manage-organize-tree"),{
				data:{key:{name:'orgName'},simpleData:{idKey:'orgId'}},
				callback:{onExpand:function(event, treeId, treeNode){
					alert(treeNode.orgId + ", " + treeNode.orgName);
					dd(treeNode);
				},onCollapse:function(event, treeId, treeNode){
					alert(treeNode.tId + ", " + treeNode.orgName);
				}}
			});
			treeObj.addNodes(null, [{orgName:"全省",orgId:1,orgType:1,orgTypeName:'省',isParent:true}]);
		});
		$$('.user-manage-page-title').html(query.staffName+"("+query.staffCode+")");
	}
	
	function dd(treeNode){
		app.f7.showIndicator();
		tool.appAjax(tool.appPath.emopPro+'organize/children',{orgId:treeNode.orgId},function(data){
			if(data.state){
				$$.each(data.info,function(i,n){
					n.isParent = n.orgType < 4 ? true : false;
					
					delete n.childrens;
					delete n.orgAbbr;
					delete n.parent;
					delete n.state;
					delete n.stateName;
					
				});
//				console.log(data.info);
				treeObj.removeChildNodes(treeNode);
				treeObj.addNodes(treeNode,data.info);
			}
		},function(){

		},function(){
			app.f7.hideIndicator();
		}); 
	};
	
	return {
		init: init
	};
});