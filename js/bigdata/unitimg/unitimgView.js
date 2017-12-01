define(['app','bigdata/unitimg/unitimgCanvas','bigdata/unitimg/unitimgEcharts',
		'text!bigdata/unitimg/unitimg-page-content.tpl'], function(app,unitimgCanvas,unitimgEcharts,template) {
	var $$ = Dom7;

	function render(params) {
		params.model.canvasWidth = ($$('body').outerWidth()-40)+'px';
		dvalue(params.model,'OP_TIME','-');
		dvalue(params.model,'DYNAMIC_TYPE','-');
		dvalue(params.model,'CREDIT','-');
		dvalue(params.model,'TRADE_NAME','-');
		dvalue(params.model,'MAIN_INFO_PRODS','-');
		dvalue(params.model,'PACK_NUMS',0);
		dvalue(params.model,'FLOW_RATE',0);
		dvalue(params.model,'UNIT_OWE_FEE',0);
		dvalue(params.model,'ZX_NUMS',0);
		dvalue(params.model,'DATA_ZX_NUMS',0);
		dvalue(params.model,'VOIP_ZX_NUMS',0);
		dvalue(params.model,'NET_ZX_NUMS',0);
		dvalue(params.model,'ZX_LI_NUMS',0);
		dvalue(params.model,'PORT_NUMS',0);
		dvalue(params.model,'PORT_MSG_NUMS',0);
		dvalue(params.model,'MEB_NUMS',0);
		dvalue(params.model,'G4_TERM_NUMS',0);
		dvalue(params.model,'G4_NUMS',0);
		dvalue(params.model,'N_G4_NUMS',0);
		dvalue(params.model,'CHN_NUMS',0);
		dvalue(params.model,'KUNB_EXP_NUMS',0);
		dvalue(params.model,'MEB_0_6',0);
		dvalue(params.model,'MEB_7_12',0);
		dvalue(params.model,'MEB_13_24',0);
		dvalue(params.model,'MEB_25',0);
		dvalue(params.model,'ZX_CUR_FEE',0);
		dvalue(params.model,'ZX_FEE_TL',0);
		dvalue(params.model,'ZX_FEE_TL_RATE',0);
		dvalue(params.model,'ZX_NUMS',0);
		dvalue(params.model,'ZX_PACK_TL',0);
		dvalue(params.model,'ZX_PACK_TL_RATE',0);
		dvalue(params.model,'ZX_PRICE',0);
		dvalue(params.model,'ZX_PRICE_TL',0);
		dvalue(params.model,'ZX_PRICE_TL_RATE',0);
		dvalue(params.model,'GJR_TERM_BRAND','-');
		dvalue(params.model,'MEB_APP','-');
		dvalue(params.model,'MEB_PRE3_TELE','-');
		decimalFormat(params.model,'UNIT_FEE',2);
		decimalFormat(params.model,'UNIT_OWE_FEE',2);
		decimalFormat(params.model,'ZX_PRICE',2);
		decimalFormat(params.model,'ZX_CUR_FEE',2);
		decimalFormat(params.model,'ZX_OWE_FEE',2);
		decimalFormat(params.model,'MAS_CUR_FEE',2);
		decimalFormat(params.model,'MAS_OWE_FEEE',2);
		decimalFormat(params.model,'ZX_PRICE',2);
		decimalFormat(params.model,'GJR_FEE',2);
		decimalFormat(params.model,'GJR_CUR_VOC',2);
		decimalFormat(params.model,'GJR_CUR_GPRS',2);
		percent(params.model,'LOST_RATE',0);
		percent(params.model,'TERM_KUNB_RATE',0);
		percent(params.model,'UNIT_SC_RATE',0);
		percent(params.model,'WB_FEE_RATE',0);
		percent(params.model,'WB_MEB_RATE',0);
		percent(params.model,'WB_MEB_ARPU',0);
		percent(params.model,'GJR_YD_MOU',0);
		percent(params.model,'GJR_DX_MOU',0);
		percent(params.model,'GJR_LT_MOU',0);
		percent(params.model,'APP_MAIL',0);
		percent(params.model,'APP_ANIME',0);
		percent(params.model,'APP_MUSIC',0);
		percent(params.model,'APP_DOWN',0);
		percent(params.model,'APP_ECO',0);
		percent(params.model,'APP_STORE',0);
		percent(params.model,'APP_VIDEO',0);
		percent(params.model,'APP_MSG',0);
		percent(params.model,'APP_GAME',0);
		percent(params.model,'A_SWDL_RATE','-');
		percent(params.model,'A_WLW_RATE','-');
		percent(params.model,'A_YMAS_RATE','-');
		percent(params.model,'A_IDC_RATE','-');
		percent(params.model,'A_ICT_RATE','-');
		
		dvalue(params.model,'FLOW_RATE',0);
		params.model['FLOW_RATE'] = Math.abs(params.model['FLOW_RATE']);
		percent(params.model,'FLOW_RATE',0);
		dvalue(params.model,'GJR_CS_TIME','-');
		dvalue(params.model,'GJR_ZD_TIME','-');
		
		$$('.bigdata-unitimg-page .page-pull-content').html(Template7.compile(template)(params.model));
		bindEvents(params.bindings);
		unitimgCanvas.initPageCanvas(params.model);
		unitimgEcharts.initPageEcharts(params.model);
	}
	
	function bindEvents(bindings) {
		for (var i in bindings) {
//			$$(bindings[i].element).off(bindings[i].event);
//			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	function dvalue(model,key,value){
		model[key] = model[key] ? model[key] : value;
	}
	
	function percent(model,key,value){
		model[key] = (model[key] ? Math.round(model[key]*10000)/100 : value);
	}
	
	function decimalFormat(model,key, n){//s:数值,n:精度
		var s = model[key] ? model[key] : 0;
		if(typeof(s) != "undefined"){
			var bw = false;
			if(s > 1000000){//百万
				s = s/10000;
				bw = true;
			}
			n = n >= 0 && n <= 20 ? n : 2;
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//四舍五入
		    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		    t = "";
		    for (i = 0; i < l.length; i++) {
		        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		    }
		    model[key] = t.split("").reverse().join("") + (n > 0 ?("." + r):"")+(bw ? '万':'');
	   	}else{
			model[key] = '-';
	   	}
	}
	
	return {
		render: render
	};
});