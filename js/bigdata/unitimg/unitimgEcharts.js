define(['echarts'],function(echarts) {
	var $$ = Dom7;
	
	/**
	 * 供调用的画Echarts方法
	 * @param _this
	 */
	function initPageEcharts(info){
		if($$("[ref='_echarts_arrear']")[0]){
			drawCommonSeriesChart({el:$$("[ref='_echarts_arrear']")[0],xAxisData:["0-6个月","7-12个月","13-24个月","24个月以上"],series:[{
				name: '集团欠费',
		        type: 'bar',
		        barWidth:'10',
		        barMinHeight:'2',
		        data: info.MON_OWE,
		        itemStyle:{normal:{color:'#64AF83'}}
			}]});
		}
		if($$("[ref='_echarts_dedicate']")[0]){
			drawCirqueChart({el:$$("[ref='_echarts_dedicate']")[0],items:[
			    {thisTitle:'当前集团收入',thisValue:info.ZX_CUR_FEE,
			     otherTitle:'同类平均收入',otherValue:info.ZX_FEE_TL,
			     rate:info.ZX_FEE_TL_RATE},
			    {thisTitle:'当前集团规模',thisValue:info.ZX_NUMS,
			     otherTitle:'同类平均规模',otherValue:info.ZX_PACK_TL,
			     rate:info.ZX_PACK_TL_RATE},
			    {thisTitle:'当前集团单价',thisValue:info.ZX_PRICE,
			     otherTitle:'同类平均单价',otherValue:info.ZX_PRICE_TL,
			     rate:info.ZX_PRICE_TL_RATE}
			]});
		}
		if($$("[ref='_echarts_mas']")[0]){
			drawCirqueChart({el:$$("[ref='_echarts_mas']")[0],items:[
				{thisTitle:'当前集团收入',thisValue:info.MAS_CUR_FEE,
				 otherTitle:'同类平均收入',otherValue:info.MAS_FEE_TL,
				 rate:info.MAS_FEE_TL_RATE},
				{thisTitle:'当前集团规模',thisValue:info.MAS_PACK,
				 otherTitle:'同类平均规模',otherValue:info.MAS_PACK_TL,
				 rate:info.MAS_PACK_TL_RATE},
				{thisTitle:'当前集团发送',thisValue:info.PORT_MSG_NUMS,
				 otherTitle:'同类平均发送',otherValue:info.PORT_MSG_TL,
				 rate:info.PORT_MSG_TL_RATE}
			]});
		}
		if($$("[ref='_echarts_hinge']")[0]){
			drawCommonLineChart({el:$$("[ref='_echarts_hinge']")[0],xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],seriesData:info.GJR_MON_FEE,seriesName:'集团关键人员消费'});
		}
	}
	
	/**
	 * 画常规线性质的趋势Echart
	 * @param options
	 */
	function drawCommonLineChart(options){
		var chart = echarts.init(options.el);
		var option = {
	    	tooltip: {trigger:'axis',axisPointer:{lineStyle:{color:'#FFF'}}},
	        grid:{
	        	top:5,
	        	bottom:20,
	        	right:5
	        },
	        xAxis: {
	        	axisLine:{lineStyle:{color:'#FFFFFF'}},
	            data: options.xAxisData
	        },
	        yAxis: {
	        	axisLine:{lineStyle:{color:'#FFFFFF'}},
	        	axisLabel:{textStyle:{color:'#FFFFFF'},formatter:function(value, index){
	            	return echartsAxisFormat(value);
	            }}
	        },
	        series: [{
	        	name: options.seriesName,
	            type: 'line',
	            data: options.seriesData,
	            itemStyle:{normal:{color:'#FFDF36'}}
	        }]
	    };
	    chart.setOption(option);
	}
	
	/**
	 * 画集团业务特征指标对比圆环的Echart
	 * @param options
	 */
	function drawCirqueChart(options){
		var chart = echarts.init(options.el);
		var option = {
			graphic:privateCirqueGraphic(options.items),
			series:privateCirqueSeries(options.items)
		};
	    chart.setOption(option);
	    chart.resize();
	}
	
	/**
	 * 画通用series配置的Echart
	 * @param options
	 */
	function drawCommonSeriesChart(options){
		var chart = echarts.init(options.el);
	    var option = {
	        tooltip: {trigger:'axis',axisPointer:{lineStyle:{color:'#FFF'}}},
	        grid:{
	        	top:5,
	        	bottom:20,
	        	right:5
	        },
	        xAxis: {
	        	axisLine:{lineStyle:{color:'#FFFFFF'}},
	            data: options.xAxisData
	        },
	        yAxis: {
	        	axisLine:{lineStyle:{color:'#FFFFFF'}},
	        	axisLabel:{textStyle:{color:'#FFFFFF'},formatter:function(value, index){
	            	return echartsAxisFormat(value);
	            }}
	        },
	        series: options.series
	    };
	    chart.setOption(option);
	}
	
	function privateCirqueGraphic(items){
		var results = [];
		for(var i = 0;i < items.length;i++){
			results.push({
	            type: 'text',
	            z: 100,
	            bottom:'5px',
	            left: (i*34)+'%',
	            style: {
	                text: items[i].otherTitle+":"+decimalFormat(items[i].otherValue,0),
	                font: '12px "STHeiti", sans-serif',//bolder
	                fill: '#99DEFD'
	            }
	        });
			results.push({
	            type: 'text',
	            z: 100,
	            bottom:'20px',
	            left: (i*34)+'%',
	            style: {
	                text: items[i].thisTitle+":"+decimalFormat(items[i].thisValue,0),
	                font: '12px "STHeiti", sans-serif',//bolder
	                fill: '#FFDF36'
	            }
	        });
	        results.push({
	            type: 'text',
	            z: 100,
	            top:'50px',
	            left: (33*i+10)+"%",
	            style: {
	                text: decimalFormat(items[i].rate*100.00,2)+"%",
	                font: '12px "STHeiti", sans-serif',//bolder
	                fill: '#FFDF36'
	            }
	        });
		}
		return results;
	}
	
	function privateCirqueSeries(items){
		var results = [];
		for(var i = 0;i < items.length;i++){
			results.push({
			    type:'pie',
			    clockWise:false,
			    radius : [25, 35],
			    center:[(33*i+16)+"%","55px"],
			    hoverAnimation:false,
			    label:{normal:{show:false}},
			    labelLine:{normal:{show:false}},
			    itemStyle:{normal:{color:'#FFDF36'}},
			    data:[
			        {
			            value:items[i].thisValue, 
			            name:items[i].thisTitle
			        },
			        {
			            value:items[i].otherValue,
			            name:'invisible',
			            itemStyle : {
			        	    normal : {
			        	        color: 'rgba(0,0,0,0)',
			        	    },
			        	    emphasis : {
			        	        color: 'rgba(0,0,0,0)'
			        	    }
			        	}
			        }
			    ]
			});
			results.push({
				type:'pie',
		        clockWise:false,
		        radius : [35, 45],
		        center:[(33*i+16)+"%","55px"],
		        hoverAnimation:false,
		        label:{normal:{show:false}},
		        labelLine:{normal:{show:false}},
		        itemStyle:{normal:{color:'#99DEFD'}},
		        data:[
		            {
		                value:items[i].otherValue,
		                name:items[i].otherTitle
		            },
		            {
		                value:items[i].thisValue,
		                name:'invisible',
		                itemStyle : {
			        	    normal : {
			        	        color: 'rgba(0,0,0,0)',
			        	    },
			        	    emphasis : {
			        	        color: 'rgba(0,0,0,0)'
			        	    }
			        	}
		            }
		        ]
			});
		}
		return results;
	}
	
	function decimalFormat(s, n){//s:数值,n:精度
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
		    return t.split("").reverse().join("") + (n > 0 ?("." + r):"")+(bw ? '万':'');
	   	}else{
			return '-';
	   	}
	}
	
	/**
	 * 简化大数值的显示(通常用于Echarts值维度)
	 * @param {Object} s
	 */
	echartsAxisFormat = function(s){
		if(typeof(s) != "undefined"){
			var base = 10000;
			var dw = "";
			if(s >= (base * 10000)){
				s = s/(base*10000);
				dw = '亿';
			}else if(s >= base * 1000){
				s = s/(base*1000);
				dw = '千万';
			}else if(s >= base * 100){
				s = s/(base*100);
				dw = '00万';
			}else if(s >= base * 10){//10万
				s = s/(base*10);
				dw = '0万';
			}else if(s > base){//万
				s = s/base;
				dw = '万';
			}
	//	    return parseInt(s)+dw;
		    return s+dw;
	   	}else{
			return '-';
	   	}
	}
	
	return {
		initPageEcharts: initPageEcharts
	};
});