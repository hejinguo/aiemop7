define(['app','base64'],function(app,base64) {
	var $$ = Dom7;
	var appPath = {download:'http://218.205.252.12:10029/emop.apk',//最新安装包地址
			emop:'http://218.205.252.12:10029/aiemop/',//政企营销项目地址
			work:'http://218.205.252.12:10029/aiwork/',//挂牌攻坚项目地址
			emopPro:'http://218.205.252.12:10029/aiemopPro/'//政企营销PC项目地址
	};
	
	function setUser(baseUser){
		sessionStorage.setItem("_USER_BASE_INFO",base64.encode(JSON.stringify(baseUser)));
	}
	
	function getUser(){
		return JSON.parse(base64.decode(sessionStorage.getItem("_USER_BASE_INFO")||'')||'{}')
	}
	
	function encode(content){
		return base64.encode(content);
	}
	
	function decode(content){
		return base64.decode(content);
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
//		alert(workToken);
		$$.ajax({
			url:url,
			data:param,
			method:'POST',
	        dataType:'json',
	        timeout:10000,//超时时间设置为10秒
	        contentType: contentType,
	        crossDomain:true,
	        headers:{'X-Requested-With':'XMLHttpRequest','AI-Requested-Way':'H5','AI-Login-Token':workToken},
	        success:function(data, status, xhr){
	            if(!data.state && data.code == "JAVA_EXCEPTION"){
	            	app.f7.alert('服务端请求处理发生问题,请联系系统管理员.');
	            	onError();
				}else if(!data.state && data.code == "SHOW_MSG"){
					app.f7.alert("SHOW_MSG="+data.info);
					onError();
				}else if(!data.state && data.code == "CHARACTER_WRONGFUL"){
					app.f7.alert('您提交的数据中含有非法字符,请调整后继续.');
					onError();
				}else if(!data.state && data.code == "NOT_LOGINED"){
					app.f7.alert('您尚未登陆或账号在其他终端上登陆导致本设备踢出.');
				}else{
					onSuccess(data);
				}
	        },
	        error:function(xhr, status){
	            app.f7.alert("服务器处理过程发生问题,错误状态码："+status);
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
		setUser:setUser,
		getUser:getUser,
        appAjax:appAjax,
        appJson:appJson,
        appPath:appPath
    };
});