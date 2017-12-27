<div class="content-block-title">
	商铺基本信息
</div>
<div class="content-block-card">
	<div class="row">
		<div class="col-100">商铺名称：<span>{{ENT_NAME}}</span></div>
		<div class="col-50">商铺类型：<span>{{TYPE_ID}}{{js "this.MARKET_NAME ? '('+this.MARKET_NAME+')' : ''"}}</span></div>
		<div class="col-50">是否拓展：<span>{{js "this.ENT_STATE == 2 ? '已拓展' : (this.ENT_STATE == 1 ? '未拓展' : '未管理')"}}</span></div>
		<div class="col-50">归属地市：<span>{{CITY_CODE}}</span></div>
		<div class="col-50">归属区县：<span>{{COUNTY_CODE}}</span></div>
		<div class="col-100">街道：<span>{{js "this.STREET ? this.STREET : '不详'"}}</span></div>
		<div class="col-100">地址：<span>{{js "this.ADDRESS ? this.ADDRESS : '不详'"}}</span></div>
		<div class="col-100">联系人：<span>{{js "this.TEL_NAME ? this.TEL_NAME : '不详'"}}</span></div>
		<div class="col-100">联系电话：<span>{{js "this.TEL1 ? this.TEL1 : ''"}}、{{js "this.TEL2 ? this.TEL2 : ''"}}</span></div>
	</div>
</div>
<div class="content-block-title">
	商铺扩展信息
</div>
<div class="content-block-card">
	<div class="row">
		<div class="col-100">是否完成集团组网：<span>{{js "this.ENT_NETWORK == 'Y' ? '是' : '否'"}}</span></div>
		<div class="col-50">宽带资源是否覆盖：<span>{{js "this.BROADBAND == 'Y' ? '是' : '否'"}}</span></div>
		<div class="col-50">是否维护：<span>{{js "this.FLAG == 'Y' ? '是' : '否'"}}</span></div>
		<div class="col-50">集团编码：<span>{{js "this.ENT_280 ? this.ENT_280 : '无'"}}</span></div>
		<div class="col-50">集团成员数：<span>{{ENT_MEMBERS}}</span></div>
		<div class="col-50">商务动力座机：<span>{{BUSINESS_TEL}}</span></div>
		<div class="col-50">网格编码：<span>{{js "this.GRID_CODE ? this.GRID_CODE :'无'"}}</span></div>
		<div class="col-50">宽带号码：<span>{{BROADBAND_NUMBER}}</span></div>
		<div class="col-50">网格名称：<span>{{GRID_NAME}}</span></div>
		<div class="col-100">备注：<span>{{js "this.REMARK ? this.REMARK :'无'"}}</span></div>
	</div>
</div>
<div class="content-block-title">
	门头照信息
</div>
<div class="content-block-card">
	{{#js_if "this.ENT_IMAGE"}}
		<img src="{{ENT_IMAGE}}" style="width:100%;"/>
	{{else}}
		<span>未上传门头照</span>
	{{/js_if}}
</div>
<div class="content-block-title">
	个性化信息
</div>
<div class="shop-detail-individual-card content-block-card">
	<div class="aui-preloader-content"><span class="preloader"></span></div>
</div>
<div class="content-block-title">
	经纬度坐标
</div>
<div class="shop-detail-map-card content-block-card" style="padding:5px;">
	{{#js_if "this.LONGITUDE && this.LATITUDE"}}
		<div style="width:100%;height:230px;"></div>
		<span>{{js "this.LONGITUDE && this.LATITUDE ? '('+this.LONGITUDE+','+this.LATITUDE+')' : ''"}}</span>
	{{else}}
		<span>经纬度不明确</div></span>
	{{/js_if}}
</div>

<a href="pages/shop/shop-save.html?entCode={{ENT_CODE}}" class="button button-fill color-orange" style="margin:10px;">编辑商铺</a>
<a href="#" class="button button-fill color-red delete-shop-button" style="margin:10px;">删除商铺</a>