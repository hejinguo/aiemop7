//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.shop-save-page-navbar-inner .right a',
		event: 'click',
		handler: clickSaveShopItem
	},{
		element: '.shop-save-page form [type="file"]',
		event: 'change',
		handler: selectShopPhoto
	},{
		element: '.shop-save-page form img',
		event: 'click',
		handler: function(){
			$$('.shop-save-page form [type="file"]').click();
		}
	},{
		element: '.shop-save-page form [name="CITY_CODE"]',
		event: 'change',
		handler: function(){
			var countyList = cacheData.allCountyList.filter(function(county){
				return county.cityName == $$('.shop-save-page form [name="CITY_CODE"]').val();
			});
			$$('.shop-save-page form [name="COUNTY_CODE"]').html('');
			$$.each(countyList,function(i,n){
				app.f7.smartSelectAddOption('.shop-save-page form [name="COUNTY_CODE"]', '<option value="'+n.countyName+'">'+n.countyName+'</option>');
			});
		}
	}];
	var cacheData = {};
	
	function init(query){
		tool.appAjax(tool.appPath.emopPro+'shop/getShopManageAuth',{},function(data){
			if(data.state){
				$$('.shop-save-page form [name="CITY_CODE"]').html('');
				$$.each(data.info.shopCityList,function(i,n){
					app.f7.smartSelectAddOption('.shop-save-page form [name="CITY_CODE"]', '<option value="'+n.cityName+'">'+n.cityName+'</option>');
				});
				$$.each(data.info.shopTypeList,function(i,n){
					app.f7.smartSelectAddOption('.shop-save-page form [name="TYPE_ID"]', '<option value="'+n.typeName+'">'+n.typeName+'</option>');
				});
				cacheData.allCountyList = data.info.allCountyList;
			}
		});
		
		if(query.entCode){
			$$('.shop-save-page-navbar-inner .center').html('编辑商铺('+query.entName+')');
			loadShopDetailInfo(query);
		}else{
			$$('.shop-save-page-navbar-inner .center').html('添加商铺');
		}
		require(['shop/save/saveView'], function(saveView) {
			saveView.render({bindings:bindings});
		});
	}
	
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				app.f7.formFromData($$('.shop-save-page form'),data.info[0])
			}
		});
	}
	
	function clickSaveShopItem(){
		var _this = $$('.shop-save-page form [type="file"]')[0];
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo){
			console.log(photo.size+"   "+(photo.size/1024)+"    "+photo.type);
			if(photo.size/1024 > 1024){//大于1M的门头照需要进行提醒
				app.f7.alert('对不起,门头照暂不允许大于1M的图片.');
				return;
			}else{
				var formData = app.f7.formToData($$('.shop-save-page form'));
				var reader = new FileReader();
				reader.readAsDataURL(photo);
				reader.onload = function() {
			    	var dataURL = reader.result;
			    	formData.ent_image = dataURL;
			    	formData.ent_imgtype = photo.type;
			    };
			}
		}
		app.f7.alert('保存方法我还在揣摩');
//		console.log(new FormData($$('.shop-save-page form')[0]));
//		app.f7.alert(JSON.stringify(app.f7.formToData($$('.shop-save-page form'))));
		console.log(app.f7.formToData($$('.shop-save-page form')));
		console.log(formData);
//		new FormData($$('.shop-save-page form')[0]),
	}
	
	function selectShopPhoto(){
		var _this = this;
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo){
			console.log(photo.size+"   "+(photo.size/1024)+"    "+photo.type);
			$$('.shop-save-page form img').attr('src',window.URL.createObjectURL(photo));
			if(photo.size/1024 > 1024){//大于1M的门头照需要进行提醒
				app.toast.show('对不起,门头照暂不允许大于1M的图片.');
			}
		}else{
			$$('.shop-save-page form img').removeAttr('src');
		}
	}
	
	function loadShopIndividualInfo(entCode,typeCode){
		tool.appAjax('cust/getExpandShopInfo',{entCode:entCode,typeId:typeCode},function(data){
			var individual = "";
			if(data.state && data.info.length > 0){
				individual = "<div class=\"row\">";
				$$.each(data.info, function (index, item) {
					individual += "<div class=\"col-50\">"+item.K_NAME+"："+(item.K_VALUE ? item.K_VALUE : '不详')+"</div>";
				});
				individual += "</div>";
			}else{
				individual = "无个性化信息";
			}
			$$('.shop-detail-individual-card .card-content-inner').html(individual);
		});
	}
	
	return {
		init: init
	};
});