<div class="content-block-title">
	企业基本信息
</div>
<div class="content-block-card">
	<div class="row">
		<div class="col-100">企业名称：<span>{{custName}}</span></div>
		<div class="col-100">企业编码：<span>{{custCode}}</span></div>
		<!--<div class="col-50">是否匹配：<span>{{js "this.ifMatch == 'T' ? '已匹配' : '未匹配'"}}</span></div>-->
		<!--<div class="col-50">档案编码：<span>{{custSeqid}}</span></div>-->
		<!--<div class="col-100">集团行业：<span>{{js "this.custIndustryWidth ? this.custIndustryWidth.industryName : ''"}}</span></div>-->
		<!--<div class="col-100">成立时间：<span>{{js "this.custCreateTime ? this.custCreateTime : ''"}}</span></div>-->
		<div class="col-100">行业类型：<span>{{js "this.inderstryF ? this.inderstryF : ''"}}</span></div>
		<div class="col-100">行业种类：<span>{{js "this.inderstryS ? this.inderstryS : ''"}}</span></div>
		<div class="col-100">企业类型：<span>{{js "this.custType ? this.custType : ''"}}</span></div>
		<div class="col-100">是否个体户：<span>{{js "this.ifMen ? this.ifMen : ''"}}</span></div>
		<div class="col-100">是否酒店宾馆旅馆：<span>{{js "this.ifHotel ? this.ifHotel : ''"}}</span></div>
		<div class="col-100">是否国家机构：<span>{{js "this.ifOrganization ? this.ifOrganization : ''"}}</span></div>
		<div class="col-100">是否事业单位：<span>{{js "this.ifInstitution ? this.ifInstitution : ''"}}</span></div>
		<div class="col-100">
			企业归属：
			<span>
				{{js "this.custBelongWidth && this.custBelongWidth.orgLevel == 1 ? this.custBelongWidth.lvl1OrgName: ''"}}
				{{js "this.custBelongWidth && this.custBelongWidth.orgLevel >= 2 ? this.custBelongWidth.lvl2OrgName: ''"}}
				{{js "this.custBelongWidth && this.custBelongWidth.orgLevel >= 3 ? '- '+this.custBelongWidth.lvl3OrgName: ''"}}
			</span>
		</div>
		<div class="col-100">企业地址：<span>{{this.custAddr}}</span></div>
	</div>
</div>
<div class="content-block-title">
	联系人信息
</div>
<div class="content-block-card">
	{{#js_if "this.ifArchive == 'T'"}}
		<span>完成建档的联系人信息已加密</span>
	{{else}}
		{{#js_if "this.contacts && this.contacts.length > 0"}}
			<div class="row">
				{{#each this.contacts}}
					<div class="col-50"><span>{{contactName}}</span></div>
					<div class="col-50"><span>{{contactPhone}}</span></div>
				{{/each}}
			</div>
		{{else}}
			<span>未提交联系人信息</span>
		{{/js_if}}
	{{/js_if}}
</div>
<div class="content-block-title">
	门头照信息
</div>
<div class="content-block-card">
	{{#js_if "this.images && this.images.length > 0"}}
		{{#each this.images}}
			<img src="{{imageName}}" style="width:100%;"/>
		{{/each}}
	{{else}}
		<span>未上传门头照</span>
	{{/js_if}}
</div>
<div class="content-block-title">
	经纬度坐标
</div>
<div class="cust-detail-map-card content-block-card" style="padding:5px;">
	{{#js_if "this.longitude && this.latitude"}}
		<div style="width:100%;height:230px;"></div>
		<div class="aui-text-center" style="margin-top:3px;">
			<span>{{js "this.longitude && this.latitude ? '('+this.longitude+','+this.latitude+')' : ''"}}</span>
		</div>
	{{else}}
		<span>经纬度不明确</div></span>
	{{/js_if}}
</div>

<!--<a href="pages/cust/cust-save.html?custSeqid={{custSeqid}}" class="button button-fill bg-button-edit" style="margin:10px;">编辑商铺</a>-->
<!--<a href="#" class="button button-fill bg-button-delete delete-cust-button" style="margin:10px;">删除商铺</a>-->
<!--<a href="pages/cust/cust-unit.html?custSeqid={{custSeqid}}" style="margin:10px;"
	data-panel="right" data-view=".view-right" class="button button-fill bg-button-submit open-panel">匹配存量集团</a>-->
<!--<a href="pages/cust/cust-save.html?custSeqid={{custSeqid}}" class="button button-fill bg-button-edit" style="margin:10px;">完善附加信息</a>-->
