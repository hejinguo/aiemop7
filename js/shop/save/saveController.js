define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.shop-save-page .save-shop-button',
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
	},{
		element: '.shop-save-page form [name="TYPE_ID"]',
		event: 'change',
		handler: changeShopTypeSelect
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
	
	/**
	 * 加载页面选择器的基础数据
	 * @param {Object} query
	 */
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
					$$('.shop-save-page .save-shop-button').html('编辑商铺');
					loadShopDetailInfo(query);
				}else{
					$$('.shop-save-page .save-shop-button').html('添加商铺');
					
					$$('.shop-save-page form [name="CITY_CODE"]').change();
					require(['async!BMap'], function() {
						var geolocation = new BMap.Geolocation();
						geolocation.getCurrentPosition(function(r){
							if(this.getStatus() == BMAP_STATUS_SUCCESS){
//								console.log('您的位置：'+r.point.lng+','+r.point.lat);
								$$('.shop-save-page form [name="LONGITUDE"]').val(r.point.lng);
								$$('.shop-save-page form [name="LATITUDE"]').val(r.point.lat);
								// 创建地理编码实例      
								var myGeo = new BMap.Geocoder();      
								// 根据坐标得到地址描述    
								myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
								    if (result){
								    	$$('.shop-save-page form [name="ADDRESS"]').val(result.address);
								    }
								});
							}else {
								console.log('failed'+this.getStatus());
							}        
						});
					});
				}
				$$('.shop-save-page .save-shop-button').removeClass('disabled');
			}
		});
	}
	
	/**
	 * 编辑时加载商铺具体信息
	 * @param {Object} query
	 */
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{shopCode:query.entCode},function(data){
			if(data.state){
				app.f7.formFromData($$('.shop-save-page form'),data.info[0]);
				if(data.info[0].ENT_IMAGE){
					$$('.shop-save-page form img').attr('src',tool.appPath.emop + 'cust/getShopImage?entCode=' + data.info[0].ENT_IMAGE+"&k="+new Date().getTime());
				}
				loadShopIndividualInfo(data.info[0].ENT_CODE,data.info[0].TYPE_CODE);
			}
		});
	}
	
	/**
	 * 封装保存逻辑前验证
	 */
	function clickSaveShopItem(){
		var formData = app.f7.formToData($$('.shop-save-page form'));
		var shopInfo = privatePackDataObject(formData);
		if(!shopInfo.ent_name || !shopInfo.city || !shopInfo.county || !shopInfo.typeid){
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
	
	/**
	 * 执行具体的保存逻辑
	 * @param {Object} shopInfo
	 */
	function execSaveShopInfo(shopInfo){
		console.log(shopInfo);
		var url = shopInfo.ent_code ? 'cust/updateShopInfo' : 'cust/addShopInfo';
		
		tool.appAjax(url,{shopInfo:JSON.stringify(shopInfo)},function(data){
			if(shopInfo.ent_code){//编辑
				app.view.router.back({pageName:'shop-detail'});
				app.router.load('shop-detail',cacheQuery);
			}else{//添加
				app.view.router.back({pageName:'shop'});
//				app.view.router.reloadPage('pages/shop/shop-save.html?entCode=N65941');
			}
			app.router.load('shop');
		});
	}
	
	/**
	 * 选择门头照触发事件
	 */
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
	
	/**
	 * 归属地市选择触发事件
	 */
	function changeCityCodeSelect(){
		var countyList = cacheData.allCountyList.filter(function(county){
			return county.cityName == $$('.shop-save-page form [name="CITY_CODE"]').val();
		});
		$$('.shop-save-page form [name="COUNTY_CODE"]').html('');
		$$.each(countyList,function(i,n){
			app.f7.smartSelectAddOption('.shop-save-page form [name="COUNTY_CODE"]', '<option value="'+n.countyName+'">'+n.countyName+'</option>');
		});
	}
	
	/**
	 * 商铺类型选择触发事件
	 */
	function changeShopTypeSelect(){
		var shopType = $$('.shop-save-page form [name="TYPE_ID"]').val();
		if(shopType.indexOf('市场') >= 0){
			$$('.shop-save-page .shop-save-market-name').removeClass('disabled');
		}else{
			$$('.shop-save-page form [name="MARKET_NAME"]').val('');
			$$('.shop-save-page .shop-save-market-name').addClass('disabled');
		}
	}
	
	/**
	 * 封装提交的数据
	 * @param {Object} formData
	 */
	function privatePackDataObject(formData){
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
		shopInfo.longitude=formData.LONGITUDE;
		shopInfo.latitude=formData.LATITUDE;
		shopInfo.ent_image='';
		shopInfo.ent_imgtype='';
//		shopInfo.expandInfo=[];
//		$$('.shop-save-page form [k_id]').each(function(i,n){
//			shopInfo.expandInfo.push({KID:$$(n).attr('k_id'),KValue:$$(n).val()});
//		});
		return shopInfo;
	}
	
	/**
	 * 加载扩展信息
	 * @param {Object} entCode
	 * @param {Object} typeCode
	 */
	function loadShopIndividualInfo(entCode,typeCode){
		tool.appAjax('cust/getExpandShopInfo',{entCode:entCode,typeId:typeCode},function(data){
			var individual = "<ul>";
			if(data.state && data.info.length > 0){
				$$('.shop-save-page .individual-info').removeClass('aui-hidden');
				$$.each(data.info, function (index, item) {
					individual += "<li>";
					individual += "<div class=\"item-content\"><div class=\"item-inner\">";
					individual += "<div class=\"item-title label\">"+item.K_NAME+"</div>";
					individual += "<div class=\"item-input\">";
					individual += "<input type=\"text\" k_id=\""+item.K_ID+"\" placeholder=\"请填写"+item.K_NAME+"\" value=\""+(item.K_VALUE ? item.K_VALUE : index)+"\">";
					individual += "</div>";
					individual += "</div></div>";
					individual += "</li>";
				});
			}
			individual += "</ul>";
			$$('.shop-save-page .individual-info .list-block').html(individual);
		});
	}
	
	return {
		init: init
	};
});