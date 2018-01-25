define(['app','tool'],function(app,tool){
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-save-page .geolocation-button',
		event: 'click',
		handler: geolocation
	},{
		element: '.cust-save-page .cust-save-button',
		event: 'click',
		handler: clickSaveCustItem
	},{
		element: '.cust-save-page form [type="file"]',
		event: 'change',
		handler: selectCustPhoto
	},{
		element: '.cust-save-page form img',
		event: 'click',
		handler: function(){$$('.cust-save-page form [type="file"]').click();}
	},{
		element: '.cust-save-page form [name="custIndustryWidth.priIndustryCode"]',
		event: 'change',
		handler: changePriIndustryCodeSelect
	},{
		element: '.cust-save-page form [name="custIndustryWidth.subIndustryCode"]',
		event: 'change',
		handler: changeSubIndustryCodeSelect
	},{
		element: '.cust-save-page form [name="custBelongWidth.lvl2OrgId"]',
		event: 'change',
		handler: changeLvl2OrgIdSelect
	}];
	
	function init(query){
		app.f7.onPageBack('cust-save',function(page){
			app.f7.closeModal();//'.picker-info'
		});
		
		require(['cust/save/saveView'], function(saveView) {
			saveView.render({bindings:bindings});
		});
		
		initCustPageInfo(query);
	}
	
	/**
	 * 初始化页面基础数据
	 * @param {Object} query
	 */
	function initCustPageInfo(query){
		if(query.custSeqid){
			$$('.cust-save-page form [name="custSeqid"]').val(query.custSeqid);
			$$('.cust-save-page .cust-save-button').html('编辑集团');
//			loadCustDetailInfo(query);
		}else{
//			geolocation();//默认获取当前定位信息
			$$('.cust-save-page .cust-save-button').html('添加集团');
		}
		$$('.cust-save-page .cust-save-button').removeClass('disabled');
//		加载顶级选项列表
		tool.appAjax(tool.appPath.emopPro+'cust/select',{},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="custIndustryWidth.priIndustryCode"]',data.info.custIndustrys,'industryCode','industryName',changePriIndustryCodeSelect);
				setSmartSelectOption('.cust-save-page form [name="custBelongWidth.lvl2OrgId"]',data.info.organizes,'orgId','orgName',changeLvl2OrgIdSelect);
			}
		});
	}
	
	function changePriIndustryCodeSelect(){
		var pIndustryCode = $$('.cust-save-page form [name="custIndustryWidth.priIndustryCode"]').val();
		tool.appAjax(tool.appPath.emopPro+'cust-industry/list',{pIndustryCode:pIndustryCode},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="custIndustryWidth.subIndustryCode"]',data.info,'industryCode','industryName',changeSubIndustryCodeSelect);
			}
		});
	}
	function changeSubIndustryCodeSelect(){
		var pIndustryCode = $$('.cust-save-page form [name="custIndustryWidth.subIndustryCode"]').val();
		tool.appAjax(tool.appPath.emopPro+'cust-industry/list',{pIndustryCode:pIndustryCode},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="custIndustryWidth.terIndustryCode"]',data.info,'industryCode','industryName');
			}
		});
	}
	function changeLvl2OrgIdSelect(){
		var parentOrgId = $$('.cust-save-page form [name="custBelongWidth.lvl2OrgId"]').val();
		tool.appAjax(tool.appPath.emopPro+'organize/list',{parentOrgId:parentOrgId},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="custBelongWidth.lvl3OrgId"]',data.info,'orgId','orgName');
			}
		});
	}
	
	/**
	 * 设置SmartSelect选择条目
	 * @param {Object} element
	 * @param {Object} options
	 * @param {Object} value
	 * @param {Object} text
	 */
	function setSmartSelectOption(element,options,value,text,callback){
		$$(element).html('');
		$$.each(options,function(i,n){
			app.f7.smartSelectAddOption(element, '<option value="'+n[value]+'">'+n[text]+'</option>');
		});
		callback && callback();
	}
	
	/**
	 * 获取当前定位信息
	 */
	function geolocation(){
		app.f7.showIndicator();
		require(['async!BMap'], function() {
			new BMap.Geolocation().getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
//					console.log('您的位置：'+r.point.lng+','+r.point.lat);
					$$('.cust-save-page form [name="longitude"]').val(r.point.lng);
					$$('.cust-save-page form [name="latitude"]').val(r.point.lat);
//					创建地理编码实例并根据坐标得到地址描述 
					new BMap.Geocoder().getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
					    if (result){
					    	$$('.cust-save-page form [name="custAddr"]').val(result.address);
					    	app.f7.hideIndicator();
					    }
					});
				}else {
					console.log('failed : '+this.getStatus());
				}        
			});
		});
	}
	
	/**
	 * 封装保存逻辑前验证
	 */
	function clickSaveCustItem(){
		var formData = app.f7.formToData($$('.cust-save-page form'));
		formData.ifArchive = formData.ifArchive && formData.ifArchive.length > 0 ? 'T' : 'F';
		if(!formData['custName'] || !formData['custIndustryWidth.terIndustryCode'] ||
			!formData['custBelongWidth.lvl3OrgId'] || !formData['longitude'] || !formData['latitude'] || !formData['custAddr']){
			app.f7.alert('您有未填写的必须信息,请填写完整.');
			return;
		}
		if(formData.ifArchive == 'T' && !formData['custCode']){
			app.f7.alert('已建档的集团必须填写集团280编码.');
			return;
		}
		var _this = $$('.cust-save-page form [type="file"]')[0];
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){
			tool.dealImage(window.URL.createObjectURL(photo), {width:300}, function(base) {
				$$('.cust-save-page form img').attr('src',base);
				formData['images[0].imageCode'] = 'adphoto';
				formData['images[0].imageName'] = base;
				formData['images[0].imageTitle'] = photo.type;
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
				execSaveCustInfo(formData);
			});
		}else{
			execSaveCustInfo(formData);
		}
	}
	
	/**
	 * 选择门头照触发事件
	 */
	function selectCustPhoto(){
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
	 * 执行具体的保存逻辑
	 * @param {Object} custInfo
	 */
	function execSaveCustInfo(custInfo){
		console.log(custInfo);
		
		tool.appAjax(tool.appPath.emopPro+'cust/merge',custInfo,function(data){
			console.log(data);
			if(data.state){
				if(custInfo.custSeqid){//编辑
					app.view.router.back({pageName:'cust-detail'});
					app.router.load('cust-detail',{custSeqid:custInfo.custSeqid});
				}else{//添加
					app.view.router.back({pageName:'cust'});
	//				app.view.router.reloadPage('pages/cust/cust-save.html?custSeqid=200000009');
				}
				app.router.load('cust');
			}
		});
	}





	
	
	
	/**
	 * 编辑时加载集团具体信息
	 * @param {Object} query
	 */
	function loadCustDetailInfo(query){
		tool.appAjax('cust/getShopInfoByCode',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				app.f7.formFromData($$('.cust-save-page form'),data.info[0]);
				if(data.info[0].ENT_IMAGE){
					$$('.cust-save-page form img').attr('src',tool.appPath.emop + 'cust/getShopImage?entCode=' + data.info[0].ENT_IMAGE+"&k="+new Date().getTime());
				}
			}
		});
	}
	
	return {
		init: init
	};
});