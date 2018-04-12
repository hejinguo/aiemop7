define(['app','tool','text!cust/save/save-page-content.tpl'],function(app,tool,template){
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-save-page .geolocation-button',
		event: 'click',
		handler: geolocation
	},{
		element: '.cust-save-page .selectgeoloc-button',
		event: 'click',
		handler: function(){app.f7.alert('对不起,您无权通过地图选择地理位置.');}
	},{
		element: '.cust-save-page .cust-save-button',
		event: 'click',
		handler: clickSaveCustItem
	},{
		element: '.cust-save-page .add-cust-contact-btn',
		event: 'click',
		handler: clickAddCustContact
	},{
		element: '.cust-save-page form [type="file"]',
		event: 'change',
		handler: selectCustPhoto
	},{
		element: '.cust-save-page form img',
		event: 'click',
		handler: function(){$$('.cust-save-page form [type="file"]').click();}
	},{
		element: '.cust-save-page form [name="priIndustryCode"]',
		event: 'change',
		handler: changePriIndustryCodeSelect
	},{
		element: '.cust-save-page form [name="subIndustryCode"]',
		event: 'change',
		handler: changeSubIndustryCodeSelect
	},{
		element: '.cust-save-page form [name="lvl2OrgId"]',
		event: 'change',
		handler: changeLvl2OrgIdSelect
	}];
	var pageData = {custSeqid:null,custInfo:null,smartAmount:0};//缓存页面逻辑关键数据
	
	function init(query){
		pageData = {custSeqid:null,custInfo:null,smartAmount:0};
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
		clickAddCustContact();//新增一个联系人信息
		if(query.custSeqid){
			pageData.custSeqid = query.custSeqid;//编辑操作
			switch (query.ifMatch){
				case 'T':
					$$('.cust-save-page-title').html('匹配集团的完善信息');
					break;
				case 'Y':
					$$('.cust-save-page-title').html('预建档集团完善信息');
					break;
				default:
					$$('.cust-save-page-title').html('完善信息');
					break;
			}
			$$('.cust-save-page .cust-save-button').html('提交信息');
			app.f7.showIndicator();
			setTimeout(function() {
				loadCustDetailInfo(query);
			},500);
		}else{
			$$('.cust-save-page .cust-save-button').html('添加集团');
			app.f7.showIndicator();
//			setTimeout(function() {
//				loadSmartSelectOption();
//			},500);
//			geolocation();//默认获取当前定位信息
		}
		$$('.cust-save-page .cust-save-button').removeClass('disabled');
	}
	
	/**
	 * 加载SmartSelect顶级选项列表组件
	 */
	function loadSmartSelectOption(){
		tool.appAjax(tool.appPath.emopPro+'cust/select',{},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="priIndustryCode"]',data.info.custIndustrys,'industryCode','industryName',function(){
					if(pageData.custSeqid && pageData.custInfo.custIndustryWidth){
						app.f7.formFromData($$('.cust-save-page form'),{priIndustryCode:pageData.custInfo.custIndustryWidth.priIndustryCode});
					}else{
						changePriIndustryCodeSelect();
					}
				});
				setSmartSelectOption('.cust-save-page form [name="lvl2OrgId"]',data.info.organizes,'orgId','orgName',function(){
					if(pageData.custSeqid && pageData.custInfo.custBelongWidth){
						app.f7.formFromData($$('.cust-save-page form'),{lvl2OrgId:pageData.custInfo.custBelongWidth.lvl2OrgId});
					}else{
						changeLvl2OrgIdSelect();
					}
				});
			}
		},function(){
			app.f7.hideIndicator();
		});
	}
	/**
	 * 变更一级行业的处理函数
	 */
	function changePriIndustryCodeSelect(){
		var pIndustryCode = $$('.cust-save-page form [name="priIndustryCode"]').val();
		tool.appAjax(tool.appPath.emopPro+'cust-industry/list',{pIndustryCode:pIndustryCode},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="subIndustryCode"]',data.info,'industryCode','industryName',function(){
					if(pageData.custSeqid && pageData.custInfo.custIndustryWidth){
						app.f7.formFromData($$('.cust-save-page form'),{subIndustryCode:pageData.custInfo.custIndustryWidth.subIndustryCode});
					}else{
						changeSubIndustryCodeSelect();
					}
				});
			}
		},function(){
			app.f7.hideIndicator();
		});
	}
	/**
	 * 变更二级行业的处理函数
	 */
	function changeSubIndustryCodeSelect(){
		var pIndustryCode = $$('.cust-save-page form [name="subIndustryCode"]').val();
		tool.appAjax(tool.appPath.emopPro+'cust-industry/list',{pIndustryCode:pIndustryCode},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="terIndustryCode"]',data.info,'industryCode','industryName');
			}
			if(pageData.custSeqid && pageData.custInfo.custIndustryWidth){
				app.f7.formFromData($$('.cust-save-page form'),{terIndustryCode:pageData.custInfo.custIndustryWidth.terIndustryCode});
			}
			if(++pageData.smartAmount == 2){
				app.f7.hideIndicator();
			}
		},function(){
			app.f7.hideIndicator();
		});
	}
	/**
	 * 变更地市选项的处理函数
	 */
	function changeLvl2OrgIdSelect(){
		var parentOrgId = $$('.cust-save-page form [name="lvl2OrgId"]').val();
		tool.appAjax(tool.appPath.emopPro+'organize/list',{parentOrgId:parentOrgId},function(data){
			if(data.state){
				setSmartSelectOption('.cust-save-page form [name="lvl3OrgId"]',data.info,'orgId','orgName');
			}
			if(pageData.custSeqid && pageData.custInfo.custBelongWidth){
				app.f7.formFromData($$('.cust-save-page form'),{lvl3OrgId:pageData.custInfo.custBelongWidth.lvl3OrgId});
			}
			if(++pageData.smartAmount == 2){
				app.f7.hideIndicator();
			}
		},function(){
			app.f7.hideIndicator();
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
//					console.log(r.address);
					$$('.cust-save-page form [name="longitude"]').val(r.point.lng);
					$$('.cust-save-page form [name="latitude"]').val(r.point.lat);
//					创建地理编码实例并根据坐标得到地址描述 
					new BMap.Geocoder().getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
					    if (result){
//					    	console.log(result.addressComponents);
					    	$$('.cust-save-page form [name="custAddr"]').val(result.address);
					    	app.f7.hideIndicator();
					    }
					});
				}else {
					privateGeolocationError(this.getStatus());
					app.f7.hideIndicator();
				}
			});//,{timeout:10000,maximumAge:10000,enableHighAccuracy:true}
		});
	}
	
	/**
	 * 封装保存逻辑前验证
	 */
	function clickSaveCustItem(){
		var formData = app.f7.formToData($$('.cust-save-page form'));
//		formData.ifArchive = formData.ifArchive && formData.ifArchive.length > 0 ? 'T' : 'F';
//		if(!formData['custName'] || !formData['terIndustryCode'] ||
//			!formData['lvl3OrgId'] || !formData['longitude'] || !formData['latitude'] || !formData['custAddr']){
//			app.f7.alert('您有未填写的必须信息,请填写完整.');
//			return;
//		}
//		if(formData.ifArchive == 'T' && !formData['custCode']){
//			app.f7.alert('已建档的集团必须填写集团280编码.');
//			return;
//		}
		var _this = $$('.cust-save-page form [type="file"]')[0];
		var photo = _this.files && _this.files.length > 0 ? _this.files[0] : null;
		if(photo && /image\/\w+/.test(photo.type)){//编辑或添加时提交照片数据
			tool.dealImage(window.URL.createObjectURL(photo), {width:300}, function(base) {
				$$('.cust-save-page form img').attr('src',base);
				formData.images = [{
					imageCode:'adphoto',
					imageName:base,
					imageTitle:photo.type
				}];
				console.log(photo.size/1024 +" 压缩后：" + base.length / 1024 + " ");
				execSaveCustInfo(formData);
			});
		}else if(pageData.custSeqid && $$('.cust-save-page form img').attr('src')){//编辑时未修改照片数据
			formData.images = [{
				imageCode:'adphoto'
			}];
			execSaveCustInfo(formData);
		}else{//添加时未提交照片数据
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
		custInfo.unitInfo = {custCode:custInfo.unitCode}
		delete custInfo.unitCode;
		custInfo.contacts = [];
		delete custInfo.contactName;
		delete custInfo.contactPhone;
		var contactNameArrays = $$('.cust-save-page form [name="contactName"]');
		var contactPhoneArrays = $$('.cust-save-page form [name="contactPhone"]');
		for(var i = 0;i < contactNameArrays.length ; i++){
			if(contactNameArrays[i].value && contactPhoneArrays[i].value){
				custInfo.contacts.push({contactName:contactNameArrays[i].value,contactPhone:contactPhoneArrays[i].value});
			}
		}
		console.log(custInfo);
		if(!custInfo.longitude || !custInfo.latitude || !custInfo.custAddr
				|| !(custInfo.images && custInfo.images.length > 0)
				|| !(custInfo.contacts && custInfo.contacts.length > 0)){
			app.f7.alert('您有未填写的必须信息,请填写完整.');
			return;
		}
		/*
		custInfo.custIndustryWidth = {priIndustryCode:custInfo.priIndustryCode,subIndustryCode:custInfo.subIndustryCode,terIndustryCode:custInfo.terIndustryCode};
		delete custInfo.priIndustryCode;
		delete custInfo.subIndustryCode;
		delete custInfo.terIndustryCode;
		custInfo.custBelongWidth = {lvl2OrgId:custInfo.lvl2OrgId,lvl3OrgId:custInfo.lvl3OrgId};
		delete custInfo.lvl2OrgId;
		delete custInfo.lvl3OrgId;
		*/
//		console.log(custInfo);
//		app.f7.hideIndicator();
//		return false;
		app.f7.showIndicator();
		tool.appJson(tool.appPath.emopPro+'cust/merge',JSON.stringify(custInfo),function(data){
//			console.log(data);
			if(data.state){
				if(custInfo.custSeqid){//编辑
					app.view.router.back({pageName:'cust',force:true});
//					app.router.load('cust-detail',{custSeqid:custInfo.custSeqid});
				}else{//添加
					app.view.router.back({pageName:'cust',force:true});
	//				app.view.router.reloadPage('pages/cust/cust-save.html?custSeqid=200000009');
				}
				app.router.load('cust');
			}
		},function(){
			app.f7.hideIndicator();
		});
	}

	/**
	 * 编辑时加载集团具体信息
	 * @param {Object} query
	 */
	function loadCustDetailInfo(query){
		tool.appAjax(tool.appPath.emopPro+'cust/get',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				data.info.ifMatch = query.ifMatch ? query.ifMatch : data.info.ifMatch;
				data.info.unitCode = query.unitCode ? query.unitCode : '';
				pageData.custInfo = data.info;
				app.f7.formFromData($$('.cust-save-page form'),data.info);
				if(data.info.images && data.info.images.length > 0){
					$$.each(data.info.images, function (index, element) {
						$$('.cust-save-page form img').attr('src',tool.appPath.emopPro + 'cust/getShopImage?custSeqid=' + element.custSeqid+"&fileName="+element.imageName+"&k="+new Date().getTime());
					});    
				}
				if(data.info.contacts && data.info.contacts.length > 0){
//					require(['text!cust/save/save-page-content.tpl'], function(template) {
						$$('.cust-save-page form .cust-contacts-list ul').html(Template7.compile(template)(data.info.contacts));
//					});
				}
//				loadSmartSelectOption();
				app.f7.hideIndicator();
			}
		},function(){
			app.f7.hideIndicator();
		});
	}
	
	/**
	 * 点击添加联系人信息输入项目
	 */
	function clickAddCustContact(){
		var contacts = $$('.cust-save-page .cust-contacts-list ul li').length;
		if(contacts < 5){
			$$('.cust-save-page .cust-contacts-list ul').append(Template7.compile(template)([{contactName:'',contactPhone:''}]));
		}else{
			app.f7.alert('仅允许添加最多5个联系人信息输入栏');
		}
	}
	
	/**
	 * 百度定位返回失败状态时候的处理函数
	 */
	function privateGeolocationError(status){
		switch (status){
			case BMAP_STATUS_TIMEOUT:
				app.toast.show(status+':定位过程超时,请稍后重试.');
				break;
			case BMAP_STATUS_SERVICE_UNAVAILABLE:
				app.toast.show(status+':定位服务不可用,请稍后重试.');
				break;
			case BMAP_STATUS_PERMISSION_DENIED:
				app.toast.show(status+':没有定位权限,请稍后重试.');
				break;
			case BMAP_STATUS_INVALID_REQUEST:
				app.toast.show(status+':非法定位请求,请稍后重试.');
				break;
			case BMAP_STATUS_UNKNOWN_ROUTE:
				app.toast.show(status+':导航结果未知,请稍后重试.');
				break;
			case BMAP_STATUS_UNKNOWN_LOCATION:
				app.toast.show(status+':位置结果未知,请稍后重试.');
				break;
			default://0:检索成功,1:城市列表,4:非法密钥
				app.toast.show(status+':定位过程异常,请稍后重试.');
				break;
		}
	}
	
	return {
		init: init
	};
});