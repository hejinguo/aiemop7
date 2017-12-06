<div class="card">
	<div class="card-header"><b>基础信息</b></div>
	<div class="card-content">
		<div class="card-content-inner">
			<div class="row">
				<div class="col-50">行业：{{TYPE_ID}}{{js "this.MARKET_NAME ? '('+this.MARKET_NAME+')' : ''"}}</div>
				<div class="col-50">是否拓展：{{js "this.ENT_STATE == 2 ? '已拓展' : (this.ENT_STATE == 1 ? '未拓展' : '未管理')"}}</div>
				<div class="col-50">归属地市：{{CITY_CODE}}</div>
				<div class="col-50">归属区县：{{COUNTY_CODE}}</div>
				<div class="col-100">街道：{{js "this.STREET ? this.STREET : '不详'"}}</div>
				<div class="col-100">地址：{{js "this.ADDRESS ? this.ADDRESS : '不详'"}}</div>
				<div class="col-100">联系人：{{js "this.TEL_NAME ? this.TEL_NAME : '不详'"}}</div>
				<div class="col-100">联系方式：{{js "this.TEL1 ? this.TEL1 : ''"}}、{{js "this.TEL2 ? this.TEL2 : ''"}}</div>
			</div>
		</div>
	</div>
</div>

<div class="card">
	<div class="card-header"><b>扩展信息</b></div>
	<div class="card-content">
		<div class="card-content-inner">
			<div class="row">
				<div class="col-100">是否完成集团组网：{{js "this.ENT_NETWORK == 'Y' ? '是' : '否'"}}</div>
				<div class="col-50">宽带资源是否覆盖：{{BROADBAND}}</div>
				<div class="col-50">是否维护：{{FLAG}}</div>
				<div class="col-50">集团编码：{{js "this.ENT_280 ? this.ENT_280 : '无'"}}</div>
				<div class="col-50">集团成员数：{{ENT_MEMBERS}}</div>
				<div class="col-50">商务动力座机：{{BUSINESS_TEL}}</div>
				<div class="col-50">网格编码：{{js "this.GRID_CODE ? this.GRID_CODE :'无'"}}</div>
				<div class="col-50">宽带号码：{{BUSINESS_SCALE}}</div>
				<div class="col-50">网格名称：{{GRID_NAME}}</div>
				<div class="col-100">备注：{{js "this.REMARK ? this.REMARK :'无'"}}</div>
			</div>
		</div>
	</div>
</div>

<div class="card">
	<div class="card-header"><b>门头照信息</b></div>
	<div class="card-content">
		<div class="card-content-inner" style="padding:5px;">
			{{#js_if "this.ENT_IMAGE"}}
				<img src="{{ENT_IMAGE}}" style="width:100%;"/>
			{{else}}
				<div style="padding:10px 0px;">未上传门头照</div>
			{{/js_if}}
		</div>
	</div>
</div>

<div class="card shop-detail-individual-card">
	<div class="card-header"><b>个性化信息</b></div>
	<div class="card-content">
		<div class="card-content-inner">
			<div class="aui-preloader-content"><span class="preloader"></span></div>
		</div>
	</div>
</div>

<div class="card shop-detail-map-card">
	<div class="card-header"><b>地理位置信息</b>{{js "this.LATITUDE && this.LONGITUDE ? '('+this.LATITUDE+','+this.LONGITUDE+')' : ''"}}</div>
	<div class="card-content">
		<div class="card-content-inner" style="padding:5px;">
			{{#js_if "this.LATITUDE && this.LONGITUDE"}}
				<div style="width:100%;height:230px;"></div>
			{{else}}
				<div style="padding:10px 0px;">经纬度不明确</div>
			{{/js_if}}
		</div>
	</div>
</div>

<a href="#" class="button button-fill color-red delete-shop-button" style="margin:10px;">删除商铺</a>

<!--<div class="card">
	<div class="card-content">
		<div class="card-content-inner" style="padding:5px;">
			<a href="#" class="button button-fill color-yellow">编辑商铺</a>
			<a href="#" class="button button-fill color-red" style="margin-top:10px;">删除商铺</a>
		</div>
	</div>
</div>-->