<div class="content-block-title">
	集团基本信息
</div>
<div class="content-block-card">
	<div class="row">
		<div class="col-100">集团名称：<span>{{custName}}</span></div>
		<div class="col-50">集团编码：<span>{{custCode}}</span></div>
		<div class="col-50">价值等级：<span>{{js "this.custValue ? this.custValue : '不详'"}}</span></div>
		<div class="col-50">是否建档：<span>{{js "this.ifArchive == 'T' ? '已建档' : '未建档'"}}</span></div>
		<div class="col-50">档案编码：<span>{{custSeqid}}</span></div>
		<div class="col-100">集团行业：<span>{{js "this.custIndustry ? this.custIndustry : '不详'"}}</span></div>
		<div class="col-100">集团归属：<span>{{custBelong}}</span></div>
		<div class="col-100">集团地址：<span>{{js "this.custAddr ? this.custAddr : '不详'"}}</span></div>
	</div>
</div>
<div class="content-block-title">
	联系人信息
</div>
<div class="content-block-card">
	{{#js_if "this.contacts && this.contacts.length > 0"}}
		{{#each this.contacts}}
			<span>{{contactName}}{{contactPhone}}</span><br/>
		{{/each}}
	{{else}}
		<span>未提交联系人信息</span>
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
		<span>{{js "this.longitude && this.latitude ? '('+this.longitude+','+this.latitude+')' : ''"}}</span>
	{{else}}
		<span>经纬度不明确</div></span>
	{{/js_if}}
</div>

<a href="pages/cust/cust-save.html?custSeqid={{custSeqid}}" class="button button-fill bg-button-edit" style="margin:10px;">编辑商铺</a>
<a href="#" class="button button-fill bg-button-delete delete-cust-button" style="margin:10px;">删除商铺</a>