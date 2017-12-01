<div >
	<div class="aui-text-center big-data-top-head">
		{{info.UNIT_NAME}}<br/>
		政企集团大数据报告({{dvalue(info.OP_TIME,'-')}})
	</div>
	<div class="big-data-top-col" :style="width:100%;">
		<!-- <div class="aui-text-center hidden-lg" style="margin:5px 0px -15px 0px;display:none;">
			<img alt="" src="../../resources/images/report/shuju_1.png" style="width:370px;">
		</div> -->
		<div class="big-data-bbox big-data-unitinfo">
			<div class="big-data-head">
				<div class="big-data-title">集团基本情况</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<div class="big-data-item-h6"><span>{{info.UNIT_NAME}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_3">价值评估等级为：<span>{{dvalue(info.DYNAMIC_TYPE,'-')}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_3">集团信誉度等级：<span>{{dvalue(info.CREDIT,'-')}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_4">集团产品：<span>{{dvalue(info.PACK_NUMS,'0')}}</span>个</div>
				<div class="big-data-unitinfo-h6 shuju_5">集团信息化收入：<span>{{decimalFormat(defaultValue(info.UNIT_FEE,0),2)}}</span>元</div>
				<div class="big-data-unitinfo-h6 shuju_5">集团行业：<span>{{dvalue(info.TRADE_NAME,'-')}}</span></div>
				<div class="big-data-unitinfo-h6 shuju_6">
					产生收入的主要产品：
				</div>
				<span>{{dvalue(info.MAIN_INFO_PRODS,'-')}}</span>
				<div class="aui-text-center">
					<canvas id="_canvas_unitinfo" ref="_canvas_unitinfo" width="{{canvasWidth}}" height="240" style="margin:10px auto;"></canvas>
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
					成员流失率达<span>{{percent(info.LOST_RATE,0)}}%</span>；
					集团成员流量使用{{defaultValue(info.FLOW_RATE,0) >=0 ? '提高' : '降低'}}了<span>{{percent(Math.abs(defaultValue(info.FLOW_RATE,0)),0)}}</span>%；
					集团成员终端捆绑率<span>{{percent(info.TERM_KUNB_RATE,0)}}%</span>；
				</div>
				<div style="padding:10px 5px;">集团稳保的三个特征：</div>
				<div class="aui-text-center">
					<canvas id="_canvas_progress" ref="_canvas_progress" width="{{canvasWidth}}" height="70"></canvas>
				</div>
				<div class="big-data-vice-box">
					<div class="big-data-vice-icon">2</div>
					<div class="big-data-vice-head">欠费管理</div>
				</div>
				<div style="margin-bottom:20px;">
					<template v-if="defaultValue(info.UNIT_OWE_FEE,0)>0 ? true : false">
						<div class="big-echart-head">
							<span class="big-echart-rect-icon" style="background:#64AF83;"></span>
							该集团目前欠费<span>{{decimalFormat(defaultValue(info.UNIT_OWE_FEE,0),2)}}</span>元
						</div>
						<div style="height:150px;" id="_echarts_arrear" ref="_echarts_arrear"></div>
					</template>
					<template v-else><div>该集团目前没有欠费</div></template>
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
					<template v-if="(info.A_SWDL_RATE || info.A_WLW_RATE || info.A_YMAS_RATE || info.A_IDC_RATE || info.A_ICT_RATE)">
						<ul>
							<li class="unit_order_product_item" v-if="info.A_SWDL_RATE ? true : false">
								<div class="unit_order_product_item_icon_1"></div>
								<h6>商务动力</h6>
								<span>{{percent(info.A_SWDL_RATE,'-')}}%</span>
							</li>
							<li class="unit_order_product_item" v-if="info.A_WLW_RATE ? true : false">
								<div class="unit_order_product_item_icon_2"></div>
								<h6>物联网</h6>
								<span>{{percent(info.A_WLW_RATE,'-')}}%</span>
							</li>
							<li class="unit_order_product_item" v-if="info.A_YMAS_RATE ? true : false">
								<div class="unit_order_product_item_icon_3"></div>
								<h6>MAS</h6>
								<span>{{percent(info.A_YMAS_RATE,'-')}}%</span>
							</li>
							<li class="unit_order_product_item" v-if="info.A_IDC_RATE ? true : false">
								<div class="unit_order_product_item_icon_4"></div>
								<h6>IDC</h6>
								<span>{{percent(info.A_IDC_RATE,'-')}}%</span>
							</li>
							<li class="unit_order_product_item" v-if="info.A_ICT_RATE ? true : false">
								<div class="unit_order_product_item_icon_5"></div>
								<h6>ICT</h6>
								<span>{{percent(info.A_ICT_RATE,'-')}}%</span>
							</li>
						</ul>
						<div class="aui-text-center">该集团可能错过了以上类型的信息化产品</div>
					</template>
					<template v-else>
						<div class="aui-text-center">该集团已办理大多数信息化产品,具体请查看集团业务特征</div>
					</template>
				</div>
			</div>
		</div>
	</div>
	<div class="big-data-top-col" :style="width:100%;">
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
					<canvas id="_canvas_umbrella" ref="_canvas_umbrella" width="{{canvasWidth}}" height="280"></canvas>
				</div>
			</div>
		</div>
		<div class="big-data-bbox" v-if="defaultValue(info.ZX_NUMS,0)>0 || !info.A_YMAS_RATE">
			<div class="big-data-head">
				<div class="big-data-title">集团业务特征</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<template v-if="defaultValue(info.ZX_NUMS,0)>0 ? true : false">
					<h5>集团专线</h5>
					<ul>
						<li class="unit_product_index_item unit_product_amount_index">
							<span>{{dvalue(info.ZX_NUMS,0)}}</span>条<br/>
							专线条数
						</li>
						<li class="unit_product_index_item unit_product_price_index">
							<span>{{decimalFormat(defaultValue(info.ZX_PRICE,0),2)}}</span>元/月<br/>
							专线单价
						</li>
						<li class="unit_product_index_item unit_product_money_index">
							<span>{{decimalFormat(defaultValue(info.ZX_CUR_FEE,0),2)}}</span>元<br/>
							专线当月收入
						</li>
						<li class="unit_product_index_item unit_product_owefee_index">
							<span>{{decimalFormat(defaultValue(info.ZX_OWE_FEE,0),2)}}</span>元<br/>
							专线欠费
						</li>
					</ul>
					<div style="height:150px;margin:5px 0px;" id="_echarts_dedicate" ref="_echarts_dedicate"></div>
				</template>
				<template v-if="!info.A_YMAS_RATE ? true : false">
					<h5 style="margin-top:10px;">MAS</h5>
					<ul>
						<li class="unit_product_index_item unit_product_amount_index">
							<span>{{dvalue(info.PORT_NUMS,0)}}</span>个<br/>
							端口数量
						</li>
						<li class="unit_product_index_item unit_product_send_index">
							<span>{{defaultValue(info.PORT_MSG_NUMS,0)}}</span>条<br/>
							端口当月发送量
						</li>
						<li class="unit_product_index_item unit_product_money_index">
							<span>{{decimalFormat(defaultValue(info.MAS_CUR_FEE,0),2)}}</span>元<br/>
							产品当月收入
						</li>
						<li class="unit_product_index_item unit_product_owefee_index">
							<span>{{decimalFormat(defaultValue(info.MAS_OWE_FEEE,0),2)}}</span>元<br/>
							产品欠费
						</li>
					</ul>
					<div style="height:150px;margin:5px 0px;" id="_echarts_mas" ref="_echarts_mas"></div>
				</template>
				<template v-if="false">
					<h5>集团专线</h5>
					<div class="big-data-message shuju_10">
						共有<span>{{dvalue(info.ZX_NUMS,0)}}</span>根专线，
						其中数据专线<span>{{dvalue(info.DATA_ZX_NUMS,0)}}</span>条、
						语音专线<span>{{dvalue(info.VOIP_ZX_NUMS,0)}}</span>条、
						互联网专线<span>{{dvalue(info.NET_ZX_NUMS,0)}}</span>条、
						离网专线<span>{{dvalue(info.ZX_LI_NUMS,0)}}</span>条,
						专线单价<span>{{decimalFormat(defaultValue(info.ZX_PRICE,0),2)}}</span>元/月
						<template v-if="info.ZX_MID_TIME ? true : false">，专线最早欠费于<span> {{info.ZX_MID_TIME ? moment(info.ZX_MID_TIME, "YYYYMM").format("YYYY年MM月") : '-'}} </span></template>
						<template v-if="info.ZX_OWE_FEE ? true : false">，欠费金额为<span>{{decimalFormat(defaultValue(info.ZX_OWE_FEE,0),2)}}</span>元</template>
						<template v-else>，该集团目前没有专线欠费</template>；
					</div>
					<div class="big-echart-head">
						<span class="big-echart-rect-icon"></span>
						1-{{info.ZX_MON_FEE ? info.ZX_MON_FEE.length : 0}}月专线收入<span>{{decimalFormat(defaultValue(info.ZX_TOTAL_FEE,0),2)}}</span>元、
						较去年同期{{defaultValue(info.ZX_TB_RATE,0) >=0 ? '提高' : '降低'}}了<span>{{percent(Math.abs(defaultValue(info.ZX_TB_RATE,0)),0)}}</span>%
					</div>
					<div style="height:145px;margin:5px 0px;" id="_echarts_dedicate" ref="_echarts_dedicate"></div>
					<div class="big-data-message shuju_10">
						<div style="font-size:16px;margin-top:20px;">该集团暂未订购集团专线</div>
					</div>
					<h5 style="margin-top:10px;">商务动力</h5>
					<template v-if="info.A_SWDL_RATE ? false : true">
						<div class="big-data-message shuju_11">
							商务动力产品到达<span>{{dvalue(info.SWDL_PACK_NUMS,'-')}}</span>户，
							商务动力最早欠费于<span>{{dvalue(info.SWDL_MID_TIME,'-')}}</span>，
							欠费金额为<span>{{dvalue(info.SWDL_OWE_FEE,'-')}}</span>元；
						</div>
						<div class="big-echart-head">
							<span class="big-echart-rect-icon"></span>
							1-月商务动力收入<span>{{dvalue(info.SWDL_TOTAL_FEE,'-')}}</span>元、
							较去年同期{{defaultValue(info.SWDL_TB_RATE,0) >=0 ? '提高' : '降低'}}了<span>{{percent(Math.abs(defaultValue(info.SWDL_TB_RATE,0)),0)}}</span>%
						</div>
					</template>
					<template v-else>
						<div class="big-data-message shuju_11">
							<div style="font-size:16px;margin-top:20px;">该集团暂未订购商务动力</div>
						</div>
					</template>
					<div style="height:145px;margin:5px 0px;" id="_echarts_business" ref="_echarts_business"></div>
					<h5 style="margin-top:10px;">MAS</h5>
					<div class="big-echart-head">
						<span class="big-echart-rect-icon" style="background:#FE9592;"></span>
						月端口发送量<span>{{dvalue(info.PORT_MSG_NUMS,0)}}</span>条<br/>
						<span class="big-echart-rect-icon"></span>
						1-{{info.MAS_MON_FEE ? info.MAS_MON_FEE.length : 0}}月MAS收入<span>{{decimalFormat(defaultValue(info.MAS_TOTAL_FEE,0),2)}}</span>元、
						较去年同期{{defaultValue(info.MAS_TB_RATE,0) >=0 ? '提高' : '降低'}}了<span>{{percent(Math.abs(defaultValue(info.MAS_TB_RATE,0)),0)}}</span>%
					</div>
					<div style="height:145px;margin:5px 0px;" id="_echarts_mas" ref="_echarts_mas"></div>
				</template>
			</div>
		</div>
	</div>
	<div class="big-data-top-col" :style="width:100%;">
		<div class="big-data-bbox" v-if="info.GJR_PHONE">
			<div class="big-data-head">
				<div class="big-data-title">集团关键人特征</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content shuju_15">
				<div class="big-data-message shuju_14">
					关键人使用的是<span>{{dvalue(info.GJR_TERM_BRAND,'-')}}</span>手机，
					当月消费<span>{{decimalFormat(defaultValue(info.GJR_FEE,0),2)}}</span>元，
					通话时长<span>{{decimalFormat(defaultValue(info.GJR_CUR_VOC,0),2)}}</span>分钟，
					当月流量<span>{{decimalFormat(defaultValue(info.GJR_CUR_GPRS,0),2)}}</span>MB
				</div>
				<div class="big-echart-head">
					<span class="big-echart-rect-icon"></span>1-{{info.GJR_MON_FEE ? info.GJR_MON_FEE.length : 0}}月消费
				</div>
				<div style="height:150px;" id="_echarts_hinge" ref="_echarts_hinge"></div>
				<h5>联系移动或异网客服信息</h5>
				<div class="aui-text-center" style="margin:10px auto;">
					<canvas id="_canvas_different" ref="_canvas_different" width="{{canvasWidth}}" height="200"></canvas>
				</div>
				<div style="margin:15px 0px;">
					<div class="big-data-item-h6">
						<template v-if="info.GJR_CS_TIME ? true : false">存送类营销活动于 {{info.GJR_CS_TIME ? moment(info.GJR_CS_TIME, "YYYYMMDD").format("YYYY年MM月DD日") : '-'}} 到期</template>
						<template v-else>暂无存送类营销活动即将到期</template>
					</div>
					<div class="big-data-item-h6">
						<template v-if="info.GJR_ZD_TIME ? true : false">终端类营销活动于 {{info.GJR_ZD_TIME ? moment(info.GJR_ZD_TIME, "YYYYMMDD").format("YYYY年MM月DD日") : '-'}} 到期</template>
						<template v-else>暂无终端类营销活动即将到期</template>
					</div>
				</div>
			</div>
		</div>
		<div class="big-data-bbox">
			<div class="big-data-head">
				<div class="big-data-title">集团成员特征</div>
			</div>
			<div class="big-data-icon">
				<div class="big-data-icon-img"></div>
			</div>
			<div class="big-data-content">
				<h5>应用偏好</h5>
				<h6><span>{{dvalue(info.MEB_APP,'-')}}</span>,是该集团用户最喜欢的三类应用</h6>
				<div class="aui-text-center" style="margin-bottom:20px;">
					<canvas id="_canvas_application_preference" ref="_canvas_application_preference" width="{{canvasWidth}}" height="220"></canvas>
				</div>
				<h5>终端偏好</h5>
				<h6 style="margin-bottom:20px;"><span>{{dvalue(info.MEB_PRE3_TELE,'-')}}</span>,是该集团使用率最高的三类手机品牌</h6>
				<div class="aui-text-center" style="margin-bottom:20px;">
					<canvas id="_canvas_terminal_preference" ref="_canvas_terminal_preference" width="{{canvasWidth}}" height="180"></canvas>
				</div>
			</div>
		</div>
	</div>
</div>