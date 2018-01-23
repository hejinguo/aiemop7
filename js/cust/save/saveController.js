define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-save-page .save-cust-button',
		event: 'click',
		handler: clickSaveShopItem
	},{
		element: '.cust-save-page form [type="file"]',
		event: 'change',
		handler: selectShopPhoto
	},{
		element: '.cust-save-page form img',
		event: 'click',
		handler: function(){$$('.cust-save-page form [type="file"]').click();}
	}/*,{
		element: '.cust-save-page form [name="CITY_CODE"]',
		event: 'change',
		handler: changeCityCodeSelect
	},{
		element: '.cust-save-page form [name="TYPE_ID"]',
		event: 'change',
		handler: changeShopTypeSelect
	}*/];
	var cacheData = {};
	var cacheQuery = {};
	
	function init(query){
		app.f7.onPageBack('cust-save',function(page){
			app.f7.closeModal();//'.picker-info'
		});
		
		cacheQuery = query;
//		loadShopSelectInfo(query);
		require(['cust/save/saveView'], function(saveView) {
			saveView.render({bindings:bindings});
		});
	}
	
	/**
	 * 加载页面选择器的基础数据
	 * @param {Object} query
	 */
	function loadShopSelectInfo(query){
		tool.appAjax(tool.appPath.emopPro+'cust/getShopManageAuth',{},function(data){
			if(data.state){
				cacheData.allCountyList = data.info.allCountyList;
				$$('.cust-save-page form [name="CITY_CODE"]').html('');
				$$.each(data.info.custCityList,function(i,n){
					app.f7.smartSelectAddOption('.cust-save-page form [name="CITY_CODE"]', '<option value="'+n.cityName+'">'+n.cityName+'</option>');
				});
				$$.each(data.info.custTypeList,function(i,n){
					app.f7.smartSelectAddOption('.cust-save-page form [name="TYPE_ID"]', '<option value="'+n.typeName+'">'+n.typeName+'</option>');
				});
				if(query.custSeqid){
					$$('.cust-save-page .save-cust-button').html('编辑集团');
					loadShopDetailInfo(query);
				}else{
					$$('.cust-save-page .save-cust-button').html('添加集团');
					
					$$('.cust-save-page form [name="CITY_CODE"]').change();
					require(['async!BMap'], function() {
						var geolocation = new BMap.Geolocation();
						geolocation.getCurrentPosition(function(r){
							if(this.getStatus() == BMAP_STATUS_SUCCESS){
//								console.log('您的位置：'+r.point.lng+','+r.point.lat);
								$$('.cust-save-page form [name="LONGITUDE"]').val(r.point.lng);
								$$('.cust-save-page form [name="LATITUDE"]').val(r.point.lat);
								// 创建地理编码实例      
								var myGeo = new BMap.Geocoder();      
								// 根据坐标得到地址描述    
								myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
								    if (result){
								    	$$('.cust-save-page form [name="ADDRESS"]').val(result.address);
								    }
								});
							}else {
								console.log('failed'+this.getStatus());
							}        
						});
					});
				}
				$$('.cust-save-page .save-cust-button').removeClass('disabled');
			}
		});
	}
	
	/**
	 * 编辑时加载集团具体信息
	 * @param {Object} query
	 */
	function loadShopDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				app.f7.formFromData($$('.cust-save-page form'),data.info[0]);
				if(data.info[0].ENT_IMAGE){
					$$('.cust-save-page form img').attr('src',tool.appPath.emop + 'cust/getShopImage?entCode=' + data.info[0].ENT_IMAGE+"&k="+new Date().getTime());
				}
				loadShopIndividualInfo(data.info[0].ENT_CODE,data.info[0].TYPE_CODE);
			}
		});
	}
	
	/**
	 * 封装保存逻辑前验证
	 */
	function clickSaveShopItem(){
		var formData = app.f7.formToData($$('.cust-save-page form'));
		var custInfo = privatePackDataObject(formData);
		if(!custInfo.ent_name || !custInfo.city || !custInfo.county || !custInfo.typeid){
			app.f7.alert('对不起,集团名称必须填写.');
			return;
		}
		
		var _this = $$('.cust-save-page form [type="file"]')[0];
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
			tool.dealImage(window.URL.createObjectURL(photo), {width:300}, function(base) {
				$$('.cust-save-page form img').attr('src',base);
				custInfo.ent_image = base;
				custInfo.ent_imgtype = photo.type;
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
				execSaveShopInfo(custInfo);
			});
		}else{
			execSaveShopInfo(custInfo);
		}
	}
	
	/**
	 * 执行具体的保存逻辑
	 * @param {Object} custInfo
	 */
	function execSaveShopInfo(custInfo){
		console.log(custInfo);
		var url = custInfo.ent_code ? 'cust/updateShopInfo' : 'cust/addShopInfo';
		
		tool.appAjax(url,{custInfo:JSON.stringify(custInfo)},function(data){
			if(custInfo.ent_code){//编辑
				app.view.router.back({pageName:'cust-detail'});
				app.router.load('cust-detail',cacheQuery);
			}else{//添加
				app.view.router.back({pageName:'cust'});
//				app.view.router.reloadPage('pages/cust/cust-save.html?entCode=N65941');
			}
			app.router.load('cust');
		});
	}
	
	/**
	 * 选择门头照触发事件
	 */
	function selectShopPhoto(){
		var _this = this;
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
//			$$('.cust-save-page form img').attr('src',window.URL.createObjectURL(photo));
			tool.dealImage(window.URL.createObjectURL(photo), {width: 300}, function(base) {
				$$('.cust-save-page form img').attr('src',base);
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
			});
		}else{
			$$('.cust-save-page form img').removeAttr('src');
		}
	}
	
	/**
	 * 归属地市选择触发事件
	 */
	function changeCityCodeSelect(){
		var countyList = cacheData.allCountyList.filter(function(county){
			return county.cityName == $$('.cust-save-page form [name="CITY_CODE"]').val();
		});
		$$('.cust-save-page form [name="COUNTY_CODE"]').html('');
		$$.each(countyList,function(i,n){
			app.f7.smartSelectAddOption('.cust-save-page form [name="COUNTY_CODE"]', '<option value="'+n.countyName+'">'+n.countyName+'</option>');
		});
	}
	
	/**
	 * 集团类型选择触发事件
	 */
	function changeShopTypeSelect(){
		var custType = $$('.cust-save-page form [name="TYPE_ID"]').val();
		if(custType.indexOf('市场') >= 0){
//			$$('.cust-save-page .cust-save-market-name').removeClass('disabled');
		}else{
			$$('.cust-save-page form [name="MARKET_NAME"]').val('');
//			$$('.cust-save-page .cust-save-market-name').addClass('disabled');
		}
	}
	
	/**
	 * 封装提交的数据
	 * @param {Object} formData
	 */
	function privatePackDataObject(formData){
		var custInfo = {};
		custInfo.ent_code = formData.ENT_CODE;
		custInfo.ent_name = formData.ENT_NAME;
		custInfo.city=formData.CITY_CODE;
		custInfo.county=formData.COUNTY_CODE;
		custInfo.typeid=formData.TYPE_ID;
		custInfo.marketname=formData.MARKET_NAME;
		custInfo.street=formData.STREET;
		custInfo.address=formData.ADDRESS;
		custInfo.telname=formData.TEL_NAME;
		custInfo.tel1=formData.TEL1;
		custInfo.tel2=formData.TEL2;
		custInfo.ent_280=formData.ENT_280;
		custInfo.membernums=formData.ENT_MEMBERS;
		custInfo.broadnum=formData.BROADBAND_NUMBER;
		custInfo.business_tel=formData.BUSINESS_TEL;
		custInfo.gridcode=formData.GRID_CODE;
		custInfo.gridname=formData.GRID_NAME;
		custInfo.remark=formData.REMARK;
		custInfo.typeCode=formData.TYPE_CODE;
		custInfo.network=formData.ENT_NETWORK && formData.ENT_NETWORK.length > 0 ? 'Y' : 'N';
		custInfo.broadband=formData.BROADBAND && formData.BROADBAND.length > 0 ? 'Y' : 'N';
		custInfo.isflag=formData.FLAG && formData.FLAG.length > 0 ? 'Y' : 'N';
		custInfo.longitude=formData.LONGITUDE;
		custInfo.latitude=formData.LATITUDE;
		custInfo.ent_image='';
		custInfo.ent_imgtype='';
//		custInfo.expandInfo=[];
//		$$('.cust-save-page form [k_id]').each(function(i,n){
//			custInfo.expandInfo.push({KID:$$(n).attr('k_id'),KValue:$$(n).val()});
//		});
		return custInfo;
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
				$$('.cust-save-page .individual-info').removeClass('aui-hidden');
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
			$$('.cust-save-page .individual-info .list-block').html(individual);
		});
	}
	
	return {
		init: init
	};
});