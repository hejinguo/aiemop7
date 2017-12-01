<div>
	<div class="aui-text-center big-data-top-head">
		{{UNIT_NAME}}<br/>
		政企集团大数据报告({{OP_TIME}})
	</div>
	<div class="big-data-top-col" style="width:100%;">
		<div class="big-data-bbox big-data-unitinfo">
			<div class="big-data-head">
				<div class="big-data-title">集团基本情况</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<div class="big-data-item-h6"><span>{{UNIT_NAME}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_3">价值评估等级为：<span>{{DYNAMIC_TYPE}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_3">集团信誉度等级：<span>{{CREDIT}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_4">集团产品：<span>{{PACK_NUMS}}</span>个</div>
				<div class="big-data-unitinfo-h6 shuju_5">集团信息化收入：<span>{{UNIT_FEE}}</span>元</div>
				<div class="big-data-unitinfo-h6 shuju_5">集团行业：<span>{{TRADE_NAME}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_6">
					产生收入的主要产品：
				</div>
				<span>{{MAIN_INFO_PRODS}}</span>
				<div class="aui-text-center">
					<canvas ref="_canvas_unitinfo" width="{{canvasWidth}}" height="240" style="margin:10px auto;"></canvas>
				</div>
			</div>
		</div>
		<div class="big-data-bbox">
			<div class="big-data-head">
				<div class="big-data-title">重点关注</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<h5>跟踪关注</h5>
				<div class="big-data-vice-box">
					<div class="big-data-vice-icon">1</div>
					<div class="big-data-vice-head">集团稳保</div>
				</div>
				<div class="big-data-message shuju_29">
					成员流失率达<span>{{LOST_RATE}}%</span>；
					集团成员流量使用{{js "this.FLOW_RATE >=0 ? '提高' : '降低'"}}了<span>{{FLOW_RATE}}</span>%；
					集团成员终端捆绑率<span>{{TERM_KUNB_RATE}}%</span>；
				</div>
				<div style="padding:10px 5px;">集团稳保的三个特征：</div>
				<div class="aui-text-center">
					<canvas ref="_canvas_progress" width="{{canvasWidth}}" height="70"></canvas>
				</div>
				<div class="big-data-vice-box">
					<div class="big-data-vice-icon">2</div>
					<div class="big-data-vice-head">欠费管理</div>
				</div>
				<div style="margin-bottom:20px;">
					{{#js_if "this.UNIT_OWE_FEE >0 ? true : false"}}
						<div class="big-echart-head">
							<span class="big-echart-rect-icon" style="background:#64AF83;"></span>
							该集团目前欠费<span>{{UNIT_OWE_FEE}}</span>元
						</div>
						<div style="height:150px;" ref="_echarts_arrear"></div>
					{{else}}
						<div>该集团目前没有欠费</div>
					{{/js_if}}
				</div>
			</div>
		</div>
		<div class="big-data-bbox">
			<div class="big-data-head">
				<div class="big-data-title">同类集团办理的信息化产品</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<div style="margin:20px auto;">
					{{#js_if "this.A_SWDL_RATE || this.A_WLW_RATE || this.A_YMAS_RATE || this.A_IDC_RATE || this.A_ICT_RATE"}}
						<ul>
							{{#js_if "this.A_SWDL_RATE ? true : false"}}
								<li class="unit_order_product_item">
									<div class="unit_order_product_item_icon_1"></div>
									<h6>商务动力</h6>
									<span>{{A_SWDL_RATE}}%</span>
								</li>
							{{/js_if}}
							{{#js_if "this.A_WLW_RATE ? true : false"}}
								<li class="unit_order_product_item">
									<div class="unit_order_product_item_icon_2"></div>
									<h6>物联网</h6>
									<span>{{A_WLW_RATE}}%</span>
								</li>
							{{/js_if}}
							{{#js_if "this.A_YMAS_RATE ? true : false"}}
								<li class="unit_order_product_item">
									<div class="unit_order_product_item_icon_3"></div>
									<h6>MAS</h6>
									<span>{{A_YMAS_RATE}}%</span>
								</li>
							{{/js_if}}
							{{#js_if "this.A_IDC_RATE ? true : false"}}
								<li class="unit_order_product_item">
									<div class="unit_order_product_item_icon_4"></div>
									<h6>IDC</h6>
									<span>{{A_IDC_RATE}}%</span>
								</li>
							{{/js_if}}
							{{#js_if "this.A_ICT_RATE ? true : false"}}
								<li class="unit_order_product_item">
									<div class="unit_order_product_item_icon_5"></div>
									<h6>ICT</h6>
									<span>{{A_ICT_RATE}}%</span>
								</li>
							{{/js_if}}
						</ul>
						<div class="aui-text-center">该集团可能错过了以上类型的信息化产品</div>
					{{else}}
						<div class="aui-text-center">该集团已办理大多数信息化产品,具体请查看集团业务特征</div>
					{{/js_if}}
				</div>
			</div>
		</div>
	</div>
	<div class="big-data-top-col" style="width:100%;">
		<div class="big-data-bbox">
			<div class="big-data-head">
				<div class="big-data-title">成员重点关注</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<template v-if="false">
					<div class="big-data-vice-box">
						<div class="big-data-vice-icon">1</div>
						<div class="big-data-vice-head">集团市场</div>
					</div>
					<div class="shuju_31" style="height:240px;">
						<div style="text-align:center;">
							该集团未办理MAS业务<br/>
							可以考虑开通相关业务
						</div>
						<div style="margin-top:170px;margin-left:20px;background:#B4D9EB;color:#153974;width:40px;padding:6px;border-radius:10px;">MAS</div>
					</div>
				</template>
				<div class="big-data-vice-box">
					<div class="big-data-vice-icon">1</div>
					<div class="big-data-vice-head">成员市场</div>
				</div>
				<div class="aui-text-center">
					<canvas ref="_canvas_umbrella" width="{{canvasWidth}}" height="280"></canvas>
				</div>
			</div>
		</div>
		{{#js_if "this.ZX_NUMS > 0 || !this.A_YMAS_RATE"}}
			<div class="big-data-bbox">
				<div class="big-data-head">
					<div class="big-data-title">集团业务特征</div>
				</div>
				<div class="big-data-icon">
					<div class="big-data-icon-img"></div>
				</div>
				<div class="big-data-content">
					{{#js_if "this.ZX_NUMS > 0 ? true : false"}}
						<h5>集团专线</h5>
						<ul>
							<li class="unit_product_index_item unit_product_amount_index">
								<span>{{ZX_NUMS}}</span>条<br/>
								专线条数
							</li>
							<li class="unit_product_index_item unit_product_price_index">
								<span>{{ZX_PRICE}}</span>元/月<br/>
								专线单价
							</li>
							<li class="unit_product_index_item unit_product_money_index">
								<span>{{ZX_CUR_FEE}}</span>元<br/>
								专线当月收入
							</li>
							<li class="unit_product_index_item unit_product_owefee_index">
								<span>{{ZX_OWE_FEE}}</span>元<br/>
								专线欠费
							</li>
						</ul>
						<div style="height:150px;margin:5px 0px;" ref="_echarts_dedicate"></div>
					{{/js_if}}
					{{#js_if "!this.A_YMAS_RATE ? true : false"}}
						<h5 style="margin-top:10px;">MAS</h5>
						<ul>
							<li class="unit_product_index_item unit_product_amount_index">
								<span>{{PORT_NUMS}}</span>个<br/>
								端口数量
							</li>
							<li class="unit_product_index_item unit_product_send_index">
								<span>{{PORT_MSG_NUMS}}</span>条<br/>
								端口当月发送量
							</li>
							<li class="unit_product_index_item unit_product_money_index">
								<span>{{MAS_CUR_FEE}}</span>元<br/>
								产品当月收入
							</li>
							<li class="unit_product_index_item unit_product_owefee_index">
								<span>{{MAS_OWE_FEEE}}</span>元<br/>
								产品欠费
							</li>
						</ul>
						<div style="height:150px;margin:5px 0px;" ref="_echarts_mas"></div>
					{{/js_if}}
				</div>
			</div>
		{{/js_if}}
	</div>
	<div class="big-data-top-col" style="width:100%;">
		{{#if GJR_PHONE}}
			<div class="big-data-bbox">
				<div class="big-data-head">
					<div class="big-data-title">集团关键人特征</div>
				</div>
				<div class="big-data-icon">
					<div class="big-data-icon-img"></div>
				</div>
				<div class="big-data-content shuju_15">
					<div class="big-data-message shuju_14">
						关键人使用的是<span>{{GJR_TERM_BRAND}}</span>手机，
						当月消费<span>{{GJR_FEE}}</span>元，
						通话时长<span>{{GJR_CUR_VOC}}</span>分钟，
						当月流量<span>{{GJR_CUR_GPRS}}</span>MB
					</div>
					<div class="big-echart-head">
						<span class="big-echart-rect-icon"></span>1-{{js "this.GJR_MON_FEE ? this.GJR_MON_FEE.length : 0"}}月消费
					</div>
					<div style="height:150px;" ref="_echarts_hinge"></div>
					<h5>联系移动或异网客服信息</h5>
					<div class="aui-text-center" style="margin:10px auto;">
						<canvas ref="_canvas_different" width="{{canvasWidth}}" height="200"></canvas>
					</div>
					<div style="margin:15px 0px;">
						<div class="big-data-item-h6">
							{{#js_if "this.GJR_CS_TIME ? true : false"}}
								存送类营销活动于 {{GJR_CS_TIME}} 到期
							{{else}}
								暂无存送类营销活动即将到期
							{{/js_if}}
						</div>
						<div class="big-data-item-h6">
							{{#js_if "this.GJR_ZD_TIME ? true : false"}}
								终端类营销活动于 {{GJR_ZD_TIME}} 到期
							{{else}}
								暂无终端类营销活动即将到期
							{{/js_if}}
						</div>
					</div>
				</div>
			</div>
		{{/if}}
		<div class="big-data-bbox">
			<div class="big-data-head">
				<div class="big-data-title">集团成员特征</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<h5>应用偏好</h5>
				<h6><span>{{MEB_APP}}</span>,是该集团用户最喜欢的三类应用</h6>
				<div class="aui-text-center" style="margin-bottom:20px;">
					<canvas ref="_canvas_application_preference" width="{{canvasWidth}}" height="220"></canvas>
				</div>
				<h5>终端偏好</h5>
				<h6 style="margin-bottom:20px;"><span>{{MEB_PRE3_TELE}}</span>,是该集团使用率最高的三类手机品牌</h6>
				<div class="aui-text-center" style="margin-bottom:20px;">
					<canvas ref="_canvas_terminal_preference" width="{{canvasWidth}}" height="180"></canvas>
				</div>
			</div>
		</div>
	</div>
</div>