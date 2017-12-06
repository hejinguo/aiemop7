{{#each this}}
	<li>
		<a href="pages/shop/shop-detail.html?entCode={{ENT_CODE}}&entName={{ENT_NAME}}&editFlag={{EDIT_FLAG}}" class="item-link item-content">
			<div class="item-media">
				<div class="chip-media {{js "this.ENT_IMAGE ? 'bg-pink' : 'bg-gray'"}}"><i class="f7-icons" style="font-size: 20px">images_fill</i></div>
			</div>
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{ENT_NAME}}</div><!--ENT_IMGTYPE-->
					<div class="item-after">
						<div class="chip {{js "this.ENT_STATE == 2 ? 'bg-green' : (this.ENT_STATE == 1 ? 'bg-yellow' : 'bg-red')"}}">
							<div class="chip-label">{{js "this.ENT_STATE == 2 ? '已拓展' : (this.ENT_STATE == 1 ? '未拓展' : '未管理')"}}</div>
						</div>
					</div>
				</div>
				<!--<div class="item-subtitle">Beatles</div>-->
				<div class="item-text">
					<div class="row">
						<div class="col-55">归属：{{CITY_CODE}}{{COUNTY_CODE}}</div>
						<div class="col-45">行业：{{TYPE_ID}}</div>
						<div class="col-100">街道：{{js "this.STREET ? this.STREET : '不详'"}}</div>
						<div class="col-100">地址：{{js "this.ADDRESS ? this.ADDRESS : '不详'"}}</div>
						<div class="col-100">联系电话：{{js "this.TEL1 ? this.TEL1 : ''"}}、{{js "this.TEL2 ? this.TEL2 : ''"}}</div>
						<!--<div class="col-50">集团编码：{{js "this.ENT_280 ? this.ENT_280 : '无'"}}</div>
						<div class="col-50">集团成员数：{{js "this.ENT_MEMBERS ? this.ENT_MEMBERS : '无'"}}</div>
						<div class="col-50">宽带号码：{{js "this.BROADBAND_NUMBER ? this.BROADBAND_NUMBER : '无'"}}</div>
						<div class="col-50">宽带资源是否覆盖：{{BROADBAND}}</div>
						<div class="col-50">商务动力座机：{{js "this.BUSINESS_TEL ? this.BUSINESS_TEL : '无'"}}</div>
						<div class="col-50">是否完成集团组网：{{js "this.ENT_NETWORK == 'Y' ? '是' : '否'"}}</div>
						<div class="col-50">网格编码：{{js "this.GRID_CODE ? this.GRID_CODE : '无'"}}</div>
						<div class="col-50">网格名称：{{js "this.GRID_NAME ? this.GRID_NAME : '无'"}}</div>
						<div class="col-100">备注：{{js "this.REMARK ? this.REMARK : '无'"}}</div>-->
					</div>
				</div>
			</div>
		</a>
	</li>
{{/each}}