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
		handler: function(){$$('.shop-save-page form [type="file"]').click();}
	},{
		element: '.shop-save-page form [name="CITY_CODE"]',
		event: 'change',
		handler: changeCityCodeSelect
	}];
	var cacheData = {};
	var cacheQuery = {};
	
	function init(query){
		cacheQuery = query;
		loadShopSelectInfo(query);
		require(['shop/save/saveView'], function(saveView) {
			saveView.render({bindings:bindings});
		});
	}
	
	function loadShopSelectInfo(query){
		tool.appAjax(tool.appPath.emopPro+'shop/getShopManageAuth',{},function(data){
			if(data.state){
				cacheData.allCountyList = data.info.allCountyList;
				$$('.shop-save-page form [name="CITY_CODE"]').html('');
				$$.each(data.info.shopCityList,function(i,n){
					app.f7.smartSelectAddOption('.shop-save-page form [name="CITY_CODE"]', '<option value="'+n.cityName+'">'+n.cityName+'</option>');
				});
				$$.each(data.info.shopTypeList,function(i,n){
					app.f7.smartSelectAddOption('.shop-save-page form [name="TYPE_ID"]', '<option value="'+n.typeName+'">'+n.typeName+'</option>');
				});
				if(query.entCode){
					$$('.shop-save-page-navbar-inner .center').html('编辑商铺('+query.entName+')');
					loadShopDetailInfo(query);
				}else{
					$$('.shop-save-page-navbar-inner .center').html('添加商铺');
					$$('.shop-save-page form [name="CITY_CODE"]').change();
					
					require(['async!BMap'], function() {
						var geolocation = new BMap.Geolocation();
						geolocation.getCurrentPosition(function(r){
							console.log(BMAP_STATUS_SUCCESS);
							if(this.getStatus() == BMAP_STATUS_SUCCESS){
								console.log('您的位置：'+r.point.lng+','+r.point.lat);
								// 创建地理编码实例      
								var myGeo = new BMap.Geocoder();      
								// 根据坐标得到地址描述    
								myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
								    if (result){
								    	app.f7.alert(result.address);
								    }
								});
							}else {
								console.log('failed'+this.getStatus());
							}        
						});
					});
					
				}
			}
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
		var formData = app.f7.formToData($$('.shop-save-page form'));
		var shopInfo = {};
		shopInfo.ent_code = formData.ENT_CODE;
		shopInfo.ent_name = formData.ENT_NAME;
		shopInfo.city=formData.CITY_CODE;
		shopInfo.county=formData.COUNTY_CODE;
		shopInfo.typeid=formData.TYPE_ID;
		shopInfo.marketname=formData.MARKET_NAME;
		shopInfo.street=formData.STREET;
		shopInfo.address=formData.ADDRESS;
		shopInfo.telname=formData.TEL_NAME;
		shopInfo.tel1=formData.TEL1;
		shopInfo.tel2=formData.TEL2;
		shopInfo.ent_280=formData.ENT_280;
		shopInfo.membernums=formData.ENT_MEMBERS;
		shopInfo.broadnum=formData.BROADBAND_NUMBER;
		shopInfo.business_tel=formData.BUSINESS_TEL;
		shopInfo.gridcode=formData.GRID_CODE;
		shopInfo.gridname=formData.GRID_NAME;
		shopInfo.remark=formData.REMARK;
		shopInfo.typeCode=formData.TYPE_CODE;
		shopInfo.network=formData.ENT_NETWORK && formData.ENT_NETWORK.length > 0 ? 'Y' : 'N';
		shopInfo.broadband=formData.BROADBAND && formData.BROADBAND.length > 0 ? 'Y' : 'N';
		shopInfo.isflag=formData.FLAG && formData.FLAG.length > 0 ? 'Y' : 'N';
		shopInfo.longitude='0';
		shopInfo.latitude='0';
		shopInfo.ent_image='';
		shopInfo.ent_imgtype='';
		
		if(!formData.ENT_NAME || !formData.CITY_CODE || !formData.COUNTY_CODE || !formData.TYPE_ID){
			app.f7.alert('对不起,商铺名称必须填写.');
			return;
		}
		
		var _this = $$('.shop-save-page form [type="file"]')[0];
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
			tool.dealImage(window.URL.createObjectURL(photo), {width:300}, function(base) {
				$$('.shop-save-page form img').attr('src',base);
				shopInfo.ent_image = base;
				shopInfo.ent_imgtype = photo.type;
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
				execSaveShopInfo(shopInfo);
			});
		}else{
			execSaveShopInfo(shopInfo);
		}
	}
	
	function execSaveShopInfo(shopInfo){
		console.log(shopInfo);
		
		cacheQuery.entName = shopInfo.ent_name;
		var url = shopInfo.ent_code ? 'cust/updateShopInfo' : 'cust/addShopInfo';
		tool.appAjax(url,{shopInfo:JSON.stringify(shopInfo)},function(data){
			if(shopInfo.ent_code){//编辑
				app.views[1].router.back({pageName:'shop-detail'});
				app.router.load('shop-detail',cacheQuery);
			}else{//添加
//				app.views[1].router.back({pageName:'shop'});
//				app.views[1].router.reloadPage('pages/shop/shop-save.html?entCode=N65941');
			}
			app.router.load('shop');
		});
	}
	
	function selectShopPhoto(){
		var _this = this;
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
//			$$('.shop-save-page form img').attr('src',window.URL.createObjectURL(photo));
			tool.dealImage(window.URL.createObjectURL(photo), {width: 300}, function(base) {
				$$('.shop-save-page form img').attr('src',base);
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
			});
		}else{
			$$('.shop-save-page form img').removeAttr('src');
		}
	}
	
	function changeCityCodeSelect(){
		var countyList = cacheData.allCountyList.filter(function(county){
			return county.cityName == $$('.shop-save-page form [name="CITY_CODE"]').val();
		});
		$$('.shop-save-page form [name="COUNTY_CODE"]').html('');
		$$.each(countyList,function(i,n){
			app.f7.smartSelectAddOption('.shop-save-page form [name="COUNTY_CODE"]', '<option value="'+n.countyName+'">'+n.countyName+'</option>');
		});
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