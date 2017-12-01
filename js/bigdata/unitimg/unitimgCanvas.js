define(function() {
	var $$ = Dom7;
	
	/**
	 * 供调用的画Canvas方法
	 * @param _this
	 */
	function initPageCanvas(info){
		if($$("[ref='_canvas_unitinfo']")[0]){
			var unitinfoOptions = {
				el:$$("[ref='_canvas_unitinfo']")[0],
				value:[info.MEB_NUMS,info.G4_TERM_NUMS,info.G4_NUMS,info.UNIT_SC_RATE]
			};
			drawUnitInfo(unitinfoOptions);
		}
		if($$("[ref='_canvas_progress']")[0]){
			var progressOptions = {
				el:$$("[ref='_canvas_progress']")[0],
				lineWidth:5,
				items:[{fillColor:'#99DEFD',title:'收入环比',value:info.WB_FEE_RATE},
				       {fillColor:'#FFDF36',title:'成员环比',value:info.WB_MEB_RATE},
				       {fillColor:'#8FC320',title:'成员ARPU',value:info.WB_MEB_ARPU}]
			};
			drawProgress(progressOptions);
		}
		if($$("[ref='_canvas_umbrella']")[0]){
			var umbrellaOptions = {
				el:$$("[ref='_canvas_umbrella']")[0],
				items:[{fillColor:'#FFDF36',title:'非4G终端',value:info.N_G4_NUMS,units:'户'},
				       {fillColor:'#8FC320',title:'最近换机周期用户',value:info.CHN_NUMS,units:'户'},
				       {fillColor:'#FFFFFF',title:'捆绑终端即将到期(1个月内)',value:info.KUNB_EXP_NUMS,units:'户'}]
			};
			drawUmbrella(umbrellaOptions);
		}
		if($$("[ref='_canvas_different']")[0]){
			var differentOptions = {
				el:$$("[ref='_canvas_different']")[0],
				items:[{title:'移动',value:info.GJR_YD_MOU},
					{title:'电信',value:info.GJR_DX_MOU},
					{title:'联通',value:info.GJR_LT_MOU}],
				callnumber:info.GJR_MOU
			};
			drawDifferent(differentOptions);
		}
		if($$("[ref='_canvas_application_preference']")[0]){
			var applicationOptions = {
				el:$$("[ref='_canvas_application_preference']")[0],
				items:[{title:'邮箱',value:info.APP_MAIL},{title:'动漫',value:info.APP_ANIME},
				       {title:'音乐',value:info.APP_MUSIC},{title:'下载',value:info.APP_DOWN},
				       {title:'财经',value:info.APP_ECO},{title:'应用',value:info.APP_STORE},
				       {title:'视频',value:info.APP_VIDEO},{title:'通讯',value:info.APP_MSG},
				       {title:'游戏',value:info.APP_GAME}]
			};
			drawApplicationPreference(applicationOptions);
		}
		if($$("[ref='_canvas_terminal_preference']")[0]){
			var terminalOptions = {
				el:$$("[ref='_canvas_terminal_preference']")[0],
				items:[{value:info.MEB_0_6},
					{value:info.MEB_7_12},
					{value:info.MEB_13_24},
					{value:info.MEB_25}]
			};
			drawTerminalPreference(terminalOptions);
		}
	}
	
	/**
	 * Canvas画图方法封装
	 * @param url
	 * @param callback
	 * @param wo
	 */
	function preCanvasImage(url,callback,wo){    
	    var img = new Image(); //创建一个Image对象，实现图片的预下载    
	    img.src = url;        
	    if(img.complete){// 如果图片已经存在于浏览器缓存，直接调用回调函数    
	        callback.call(img,wo.x,wo.y,wo.ex);    
	    }else{
		    img.onload = function(){//图片下载完毕时异步调用callback函数。
		        callback.call(img,wo.x,wo.y,wo.ex);//将回调函数的this替换为Image对象
		    };
	    }
	} 
	
	/**
	 * 画集团基本情况Canvas
	 * @param options
	 */
	function drawUnitInfo(options){
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		ctx.beginPath();
		ctx.lineWidth = 2;//设置当前线条的宽度
		ctx.strokeStyle = '#FFDF36';//设置笔触的颜色
		ctx.arc(options.el.width/2+options.el.width/4-20, options.el.height/2, options.el.height/2-17, 0, Math.PI*1.1,true);//1.2
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.arc(options.el.width/2+options.el.width/4-20, options.el.height/2, options.el.height/2-17, 0, Math.PI*0.9,false);//0.8
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.lineWidth = 1;//设置当前线条的宽度
		ctx.strokeStyle = '#99DEFD';//设置笔触的颜色
		ctx.arc(options.el.width/2+options.el.width/4-20, options.el.height/2, options.el.height/2-27, 0, 2 * Math.PI);
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.moveTo(0,30);
		ctx.lineTo(60,30);
		ctx.moveTo(0,30);
		ctx.lineTo(0,70);
		ctx.stroke();//绘制已定义的路径
		
		ctx.font = "12px Microsoft YaHei";//设置字体样式
	    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
	    ctx.textAlign="start";
	    ctx.fillText("集团成员"+options.value[0]+"个", 62,35);
	    
	    ctx.textAlign="center";
	    ctx.fillText("集团内市场占有率", options.el.width/2+options.el.width/4-20, options.el.height/2);
	    ctx.fillText(options.value[3]+"%", options.el.width/2+options.el.width/4-20, options.el.height/2+15);
	    
	    ctx.textAlign="start";
	    ctx.fillText("办理4G终端"+options.value[1]+"个", 5,options.el.height-50);
	    ctx.fillText("4G用户"+options.value[2]+"个", 5,options.el.height-30);
	    
	    for(var i = 0;i<10;i++){
	    	preCanvasImage("./images/work/bigdata/shuju_"+((i > Math.floor(options.value[3]/10)-1) ? "8" : "9")+".png",function(x,y,ex){
	            ctx.drawImage(this,x,y);
	        },{"x":(i >= 5 ? i-5 : i)*35+2,"y":options.el.height/2-(i < 5 ? 40 : 0)});
	    }
	}
	
	/**
	 * 画应用偏好Canvas
	 * @param options
	 */
	function drawApplicationPreference(options){
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		ctx.font = "12px Microsoft YaHei";//设置字体样式
		ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
	    for(var i = 0; i < options.items.length;i++){
	    	preCanvasImage("./images/work/bigdata/shuju_"+(16+i)+".png",function(x,y,ex){
		        ctx.drawImage(this,x,y);
		    },{"x":0,"y":(options.el.height-10)/options.items.length*i+5});
	    	preCanvasImage("./images/work/bigdata/shuju_25.png",function(x,y,ex){
		        ctx.drawImage(this,x,y);
		        ctx.textAlign="center";
		        ctx.fillText(ex.title, x+25,y+15);
		    },{"x":20,"y":(options.el.height-10)/options.items.length*i+5,"ex":{title:options.items[i].title}});
	
	    	ctx.beginPath();
	    	ctx.lineWidth = 5;//设置当前线条的宽度
	    	ctx.strokeStyle = '#C1FE62';//设置笔触的颜色
	    	ctx.moveTo(66,(options.el.height-10)/options.items.length*i+15);
	    	ctx.lineTo((options.el.width-66-33)*options.items[i].value/100+66,(options.el.height-10)/options.items.length*i+15);
	    	ctx.stroke();//绘制已定义的路径
	    	ctx.fillText(options.items[i].value+"%", (options.el.width-66-33)*options.items[i].value/100+88,(options.el.height-10)/options.items.length*i+20);
		}
		ctx.beginPath();
		ctx.lineWidth = 1;//设置当前线条的宽度
		ctx.strokeStyle = '#C1FE62';//设置笔触的颜色
		ctx.moveTo(65+1,0);
		ctx.lineTo(65+1,options.el.height);
		ctx.stroke();//绘制已定义的路径
	}
	
	/**
	 * 画终端偏好Canvas
	 * @param options
	 */
	function drawTerminalPreference(options){
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		preCanvasImage("./images/work/bigdata/shuju_26.png",function(x,y){
	        ctx.drawImage(this,x,y);
	    },{"x":0,"y":options.el.height-126});
		preCanvasImage("./images/work/bigdata/shuju_50.png",function(x,y){
	        ctx.drawImage(this,x,y);
	    },{"x":0,"y":16});
		
		ctx.beginPath();
		ctx.fillStyle='#EBFFFB';
		ctx.fillRect(150,10,options.el.width-150,25);
		ctx.fillRect(150+20,10+45,options.el.width-150,25);
		ctx.fillRect(150+40,10+90,options.el.width-150,25);
		ctx.fillRect(150+60,10+135,options.el.width-150,25);
		
		ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		ctx.font = "20px Microsoft YaHei";//设置字体样式
		ctx.fillText("1", 150-10,10+20);
		ctx.fillText("2", 150+20-13,10+45+20);
		ctx.fillText("3", 150+40-13,10+90+20);
		ctx.fillText("4", 150+60-13,10+135+20);
		ctx.font = "12px Microsoft YaHei";//设置字体样式
		ctx.fillText("目前该集团用户机型在", 0,20);
	    ctx.fillStyle = "#45A0CD";//设置字体填充颜色
	    ctx.fillText("0-6个月的 "+options.items[0].value+" 户", 150+5,10+17);
	    ctx.fillText("7-12个月的 "+options.items[1].value+" 户", 150+20+5,10+45+17);
	    ctx.fillText("13-24个月的 "+options.items[2].value+" 户", 150+40+5,10+90+17);
	    ctx.fillText("24个月以上的 "+options.items[3].value+" 户", 150+60+5,10+135+17);
	}
	
	
	/**
	 * 画联系移动或异网客服信息Canvas
	 */
	function drawDifferent(options){
		var lineWidth = 10;
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		ctx.beginPath();
		ctx.lineWidth = lineWidth;//设置当前线条的宽度
		ctx.strokeStyle = '#DFDFDF';//设置笔触的颜色
		ctx.arc(options.el.height/4+5, options.el.height/2-options.el.height/4+5, options.el.height/4, 0, Math.PI*2);
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.arc(options.el.width-options.el.height/4-5, options.el.height/2-options.el.height/4+5, options.el.height/4, 0, Math.PI*2);
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.arc(options.el.width/2+5, options.el.height/2+options.el.height/4-5, options.el.height/4, 0, Math.PI*2);
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		
		ctx.strokeStyle = '#FFFFFF';//设置笔触的颜色
		ctx.arc(options.el.height/4+5, options.el.height/2-options.el.height/4+5, options.el.height/4, Math.PI*1.5, Math.PI*2*options.items[0].value/100-Math.PI*0.5);//options.value为百分比值(0-100)
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.arc(options.el.width-options.el.height/4-5, options.el.height/2-options.el.height/4+5, options.el.height/4, Math.PI*1.5, Math.PI*2*options.items[1].value/100-Math.PI*0.5);
		ctx.stroke();//绘制已定义的路径
		ctx.beginPath();
		ctx.arc(options.el.width/2+5, options.el.height/2+options.el.height/4-5, options.el.height/4, Math.PI*1.5, Math.PI*2*options.items[2].value/100-Math.PI*0.5);
		ctx.stroke();//绘制已定义的路径
		
		ctx.beginPath();
		ctx.lineWidth = 1;//设置当前线条的宽度
	//	ctx.moveTo(options.el.height/4+options.el.height/4+lineWidth,options.el.height/2-options.el.height/4+5);
		ctx.moveTo(options.el.height/4+lineWidth,options.el.height/2+10);
		ctx.lineTo(options.el.width/2-options.el.height/4,options.el.height/2+options.el.height/4);
		ctx.stroke();//绘制已定义的路径
	//	ctx.moveTo(options.el.width-options.el.height/4-options.el.height/4-lineWidth,options.el.height/2-options.el.height/4+5);
		ctx.moveTo(options.el.width-options.el.height/4-lineWidth,options.el.height/2+10);
		ctx.lineTo(options.el.width/2+options.el.height/4+lineWidth,options.el.height/2+options.el.height/4);
		ctx.stroke();//绘制已定义的路径
		
		ctx.font = "12px Microsoft YaHei";//设置字体样式
	    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		ctx.textAlign="center";
	    ctx.fillText("过网通话"+options.callnumber+"次", options.el.width/2,options.el.height/2-options.el.height/4);
	    ctx.fillText(options.items[0].title,options.el.height/4, options.el.height/2-options.el.height/4-7);
	    ctx.fillText(options.items[0].value+"%",options.el.height/4, options.el.height/2-options.el.height/4+7);
	    ctx.fillText(options.items[1].title,options.el.width-options.el.height/4, options.el.height/2-options.el.height/4-7);
	    ctx.fillText(options.items[1].value+"%",options.el.width-options.el.height/4, options.el.height/2-options.el.height/4+7);
	    ctx.fillText(options.items[2].title,options.el.width/2, options.el.height/2+options.el.height/4-7);
	    ctx.fillText(options.items[2].value+"%",options.el.width/2, options.el.height/2+options.el.height/4+7);
	}
	
	/**
	 * 画错失重点业务/办理信息化产品Canvas
	 * @param options
	 */
	function drawImportant(options){
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		for(var i = 0;i < options.items.length ;i++){
			ctx.beginPath();
			ctx.lineWidth = 10;//设置当前线条的宽度
			ctx.strokeStyle = '#82C5DF';//设置笔触的颜色
			ctx.moveTo(options.el.width/5,30*(i+1));
			ctx.lineTo(options.el.width-options.el.width/5,30*(i+1));
			ctx.stroke();//绘制已定义的路径
			ctx.beginPath();
			ctx.strokeStyle = '#FFDF36';//设置笔触的颜色
			ctx.moveTo(options.el.width/5,30*(i+1));
			ctx.lineTo(options.el.width/5+(options.el.width-options.el.width/5*2)*(options.items[i].value/100.0),30*(i+1));
			ctx.stroke();//绘制已定义的路径
			
			ctx.font = "12px Microsoft YaHei";//设置字体样式
		    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		    ctx.textAlign="start";
		    ctx.fillText(options.items[i].value+"%", options.el.width-options.el.width/5+5,30*(i+1)+5);
		    ctx.textAlign="end";
		    ctx.fillText(options.items[i].title, options.el.width/5-5,30*(i+1)+5);
		}
	}
	
	/**
	 * 画环形进度Canvas
	 * @param options
	 */
	function drawProgress(options){
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
	//	arc()用于创建圆或部分圆,arcTo用于创建弧线
		ctx.lineWidth = options.lineWidth;//设置当前线条的宽度
		for(var i = 0 ; i <= options.items.length ; i++){
			var item = options.items[i] ? options.items[i] : {};
			ctx.strokeStyle = '#DFDFDF';//设置笔触的颜色
			ctx.beginPath();
			ctx.arc(options.el.width/3*(i+1)-options.el.width/3/2, options.el.height-15, options.el.height-20, Math.PI, 2 * Math.PI);
			ctx.stroke();//绘制已定义的路径
			ctx.beginPath();
			ctx.strokeStyle = item.value > 0 ? item.fillColor : '#FF6666';
			//设置开始处为0点钟方向(-90 * Math.PI / 180),设置开始处为9点钟方向(Math.PI)  =>  ctx.arc(100, 100, 90, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
			ctx.arc(options.el.width/3*(i+1)-options.el.width/3/2, options.el.height-15, options.el.height-20, Math.PI,(Math.PI*2-Math.PI)*Math.abs(item.value)/100+Math.PI);//item.value为百分比值(0-100)
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(options.el.width/3*(i+1)-options.el.width/3/2,options.el.height-30);
			ctx.lineTo(options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-40,options.el.height-30);
			ctx.arcTo(options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-30,options.el.height-30, options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-30, options.el.height-30+5, 10);
			ctx.lineTo(options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-30,options.el.height-30+20);
			ctx.arcTo(options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-30,options.el.height-30+25, options.el.width/3*(i+1)-options.el.width/3/2+options.el.height-30-5, options.el.height-30+25, 10);
			ctx.lineTo(options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+40,options.el.height-30+25);
			ctx.arcTo(options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+30,options.el.height-30+25, options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+30, options.el.height-30+5, 10);
			ctx.lineTo(options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+30,options.el.height-30+5);
			ctx.arcTo(options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+30,options.el.height-30, options.el.width/3*(i+1)-options.el.width/3/2-options.el.height+30+10, options.el.height-30, 10);
			ctx.lineTo(options.el.width/3*(i+1)-options.el.width/3/2,options.el.height-30);
			ctx.fillStyle = item.fillColor;
			ctx.fill();
			ctx.font = "12px Microsoft YaHei";//设置字体样式
		    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		    ctx.textAlign="center";
		    ctx.fillText(item.value+"%", options.el.width/3*(i+1)-options.el.width/3/2, options.el.height/2);
		    ctx.fillText(item.title, options.el.width/3*(i+1)-options.el.width/3/2, options.el.height-12);
		}
	}
	
	
	/**
	 * 画伞形Canvas
	 */
	function drawUmbrella(options){
		var x1 = 0;var y1 = 0;var x2 = 0;var y2 = 0;var x3 = 0;var r = 0;
		var ctx = options.el.getContext('2d');
		ctx.clearRect(0,0,options.el.width,options.el.height);
		//arc()用于创建圆或部分圆,arcTo用于创建弧线
		var maxy = options.el.height;
		var maxx = options.el.width;
		for(var i = 0;i < options.items.length ;i++){
			if(i == 0){//取3分子1居中
				x1 = maxx/3+5;
				y1 = maxy/3/2;//maxx/3/2;
				x2 = maxx/3 + maxx/3/2;
				y2 = 0;
				x3 = maxx/3*2-5;
				r = maxy/3/2;
			}else if(i == 1){//取2分子1靠右
				x1 = maxx/2+5;
				y1 = maxy/3/2+maxy/2/2+10;
				x2 = maxx/2 + maxx/2/2;
				y2 = maxy/3/2+10;
				x3 = maxx/2*2-5;
				r = maxy/2/2;
			}else if(i == 2){//取2分子1靠左
				x1 = 0+5;
				y1 = maxy/3/2+maxy/2/2+10;
				x2 = maxx/2/2;
				y2 = maxy/3/2+10;
				x3 = maxx/2-5;
				r = maxy/2/2;
			}
			//画扇的弧形形状
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.arcTo(x1,y2,x2,y2,r);
			ctx.arcTo(x3,y2,x3,y1,r);
	//		ctx.quadraticCurveTo(x2,-40,x3,y1);
			ctx.fillStyle = options.items[i].fillColor;
			ctx.fill();
			//画扇到底部文字的连接线
			ctx.beginPath();
		    ctx.moveTo(x2, y1);
		    if(i==0){
		    	ctx.lineTo(x2, maxy-40);
		    }else if(i==1){
		    	ctx.quadraticCurveTo(x1,y1+90,maxx/2+20,maxy-40);
		    }else if(i==2){
		    	ctx.quadraticCurveTo(x3,y1+90,maxx/2-20,maxy-40);
		    }
	//	    ctx.setLineDash([5,5]);
		    ctx.strokeStyle = '#FFFFFF';
		    ctx.stroke();
		    //在扇形区域添加描述文字
		    ctx.font = "12px Microsoft YaHei";//设置字体样式
		    ctx.textAlign="center";
		    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		    if(i==0){
			    ctx.fillText(options.items[i].title, x2, y2+((y1-y2)/2)+0);
			    ctx.fillText(options.items[i].value+" "+options.items[i].units, x2, y2+((y1-y2)/2)+15);
		    }else if(i==1){
				ctx.fillText(options.items[i].title, x2, y2+((y1-y2)/2)+5);
			    ctx.fillText(options.items[i].value+" "+options.items[i].units, x2, y2+((y1-y2)/2)+20);
		    }else if(i==2){
			    ctx.fillStyle = '#666666';//设置字体填充颜色
				ctx.fillText(options.items[i].title, x2, y2+((y1-y2)/2)+5);
			    ctx.fillText(options.items[i].value+" "+options.items[i].units, x2, y2+((y1-y2)/2)+20);
		    }
		}
		ctx.font = "22px Microsoft YaHei";//设置字体样式
	    ctx.fillStyle = "#FFFFFF";//设置字体填充颜色
		ctx.textAlign="center";
		ctx.fillText("4G+", maxx/2, maxy-20);
		ctx.font = "14px Microsoft YaHei";//设置字体样式
		ctx.fillText("终端全网通", maxx/2, maxy-5);
	}
	
	return {
		initPageCanvas: initPageCanvas
	};
});