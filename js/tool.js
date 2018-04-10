define(['base64'],function(base64) {
	var $$ = Dom7;
//	var appPath = {download:'https://hejinguo.win:10029/emop.apk',//最新安装包发布地址
//			emop:'https://hejinguo.win:10029/aiemop/',//政企营销项目生产环境地址
//			work:'https://hejinguo.win:10029/aiwork/',//挂牌攻坚项目生产环境地址
//			emopPro:'https://hejinguo.win:10029/aiemopPro/'//政企营销新项目生产环境地址
//	};
	var appPath = {download:'http://localhost:8080/emop.apk',//最新安装包发布地址
			emop:'http://localhost:8080/aiemop/',//政企营销项目开发环境地址
			work:'http://localhost:8080/aiwork/',//挂牌攻坚项目开发环境地址
			emopPro:'http://localhost:8080/aiemopPro/'//政企营销新项目开发环境地址
	};
	
	function setUser(baseUser){
		sessionStorage.setItem("_USER_BASE_INFO",base64.encode(JSON.stringify(baseUser)));
	}
	
	function getUser(){
		return JSON.parse(base64.decode(sessionStorage.getItem("_USER_BASE_INFO")||'')||'{}')
	}
	
	function delUser(){
		sessionStorage.removeItem("_USER_BASE_INFO");
	}
	
	function encode(content){
		return base64.encode(content);
	}
	
	function decode(content){
		return base64.decode(content);
	}
	
	/**
	 * AES加密（需要先加载lib/aes/aes.min.js文件）
	 * @param word
	 * @returns {*}
	 */
	function aesEncrypt(word){
	    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
	    var srcs = CryptoJS.enc.Utf8.parse(word);
	    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	    return encrypted.toString();
	}

	/**
	 * AES解密
	 * @param word
	 * @returns {*}
	 */
	function aesDecrypt(word){
	    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
	    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
	
	/**
	 * 传统Ajax数据请求
	 */
	function appAjax(url, param, onSuccess, onError, onComplete){
		_ai_ajax_common(url, param, onSuccess, onError, onComplete,"application/x-www-form-urlencoded");
	};
	/**
	 * JsonAjax数据请求
	 */
	function appJson(url, param, onSuccess, onError, onComplete){
		_ai_ajax_common(url, param, onSuccess, onError, onComplete,"application/json");
	};
	
	/**
	 * 动态修改浏览器标题栏
	 * @param {Object} title
	 */
	function setDocumentTitle(title) {
		document.title = title;
		if(/ip(hone|od|ad)/i.test(navigator.userAgent)) {
			var i = document.createElement('iframe');
			i.id=new Date().getTime();
			i.src = 'favicon.ico';//http://www.10086.cn/favicon.ico
			i.style.display = 'none';
			i.onload = function() {
				setTimeout(function() {
					i.remove();
				}, 9)
			}
			document.body.appendChild(i);
		}
	}
	
	/**
	 * 图片压缩，默认同比例压缩
	 * @param {Object} path 
	 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
	 * @param {Object} obj
	 *   obj 对象 有 width， height， quality(0-1)
	 * @param {Object} callback
	 *   回调函数有一个参数，base64的字符串数据
	 */
	function dealImage(path, obj, callback) {
		var img = new Image();
		img.src = path;
		img.onload = function() {
			var that = this;
			// 默认按比例压缩
			var w = that.width,
				h = that.height,
				scale = w / h;
			w = obj.width || w;
			h = obj.height || (w / scale);
			var quality = 0.7; // 默认图片质量为0.7
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// 创建属性节点
			var anw = document.createAttribute("width");
			anw.nodeValue = w;
			var anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(that, 0, 0, w, h);
			// 图像质量
			if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
				quality = obj.quality;
			}
			// quality值越小，所绘制出的图像越模糊
			var base64 = canvas.toDataURL('image/jpeg', quality);
			// 回调函数返回base64的值
			callback(base64);
		}
	}
	
	/**
	 * 滚动公告消息控件
	 * @param {Object} id
	 * @param {Object} w
	 * @param {Object} n
	 */
	function marqueeNotice(id,w,n){
		var box=$$(id)[0],can=true,w=w||1500,fq=fq||10,n=n==-1?-1:1;
		box.innerHTML+=box.innerHTML;
		box.onmouseover=function(){can=false};
		box.onmouseout=function(){can=true};
		var max=parseInt(box.scrollHeight/2);
		new function (){
			var stop=box.scrollTop%18==0&&!can;
			if(!stop){
				var set=n>0?[max,0]:[0,max];
				box.scrollTop==set[0]?box.scrollTop=set[1]:box.scrollTop+=n;
			};
			setTimeout(arguments.callee,box.scrollTop%18?fq:w);
		};
	};
	
	/**
 	* 通用Ajax方法,请勿直接调用,推荐使用ai.ajax或ai.json简化使用
 	*/
	function _ai_ajax_common(url, param, onSuccess, onError, onComplete, contentType){
		var onSuccess = arguments[2]?arguments[2]:function(){};//成功时
		var onError = arguments[3]?arguments[3]:function(){};//异常时
		var onComplete = arguments[4]?arguments[4]:function(){};//完成时
		var contentType = arguments[5]?arguments[5]:"application/x-www-form-urlencoded";//请求数据类型
		
		if(url.indexOf("http") < 0){//存在包含http地址时直接使用,保证开发者可自行提供完整url
			url = appPath.emop + url;//默认未包含http的请求均使用政企营销项目地址
		}
		var workToken = (getUser() && getUser().lastLoginToken) || '';
		$$.ajax({
			url:url,
			data:param,
			method:'POST',
	        dataType:'json',
	        timeout:15000,//超时时间设置为15秒
	        contentType: contentType,
	        crossDomain:true,
	        headers:{'X-Requested-With':'XMLHttpRequest','AI-Requested-Way':'H5','AI-Login-Token':workToken},
	        success:function(data, status, xhr){
	            if(!data.state && data.code == "JAVA_EXCEPTION"){
	            	require(['app'], function(app) {
						app.f7.alert('服务端请求处理发生问题,请联系系统管理员.');
					});
	            	onError();
				}else if(!data.state && data.code == "SHOW_MSG"){
					require(['app'], function(app) {
						app.f7.alert(data.info+".");
					});
					onError();
				}else if(!data.state && data.code == "CHARACTER_WRONGFUL"){
					require(['app'], function(app) {
						app.f7.alert('您提交的数据中含有非法字符,请调整后继续.');
					});
					onError();
				}else if(!data.state && data.code == "NOT_LOGINED"){
					require(['app'], function(app) {
						app.f7.alert('您尚未登陆或账号在其他终端上登陆导致本设备踢出.',function(){
							delUser();
							document.location.href = 'index.html';
						});
					});
				}else{
					onSuccess(data);
				}
	        },
	        error:function(xhr, status){
	            require(['app'], function(app) {
	            	if(status == 'timeout'){
	            		app.f7.alert("服务器处理过程响应超时,请稍后重试.");
	            	}else{
	            		app.f7.alert("服务器处理过程发生问题,错误状态码："+status);
	            	}
				});
	            onError();
	        },
	        complete:function(xhr, status){
	        	onComplete();
	        }
	    });
	}
	
	return {
		encode:encode,
		decode:decode,
		aesEncrypt:aesEncrypt,
		aesDecrypt:aesDecrypt,
		setUser:setUser,
		getUser:getUser,
        appAjax:appAjax,
        appJson:appJson,
        appPath:appPath,
        dealImage:dealImage,
        setDocumentTitle:setDocumentTitle,
        marqueeNotice:marqueeNotice
    };
});