define(['app','tool','login/loginView'],function(app,tool,LoginView) {
	var $$ = Dom7;
	var bindings = [{
		element: '.login-page .send-mark-button',
		event: 'click',
		handler: sendMarkForm
	},{
		element: '.login-page .submit-login-button',
		event: 'click',
		handler: submitLoginForm
	},{
		element: '.popup-reset-password .submit-resetmark-button',
		event: 'click',
		handler: clickResetMarkBtn
	},{
		element: '.popup-reset-password .submit-resetpwd-button',
		event: 'click',
		handler: clickResetPasswordBtn
	},{
		element: '.popup-reset-password .close-resetpwd-button',
		event: 'click',
		handler: clickCloseResetpwdBtn
	}];

	function init() {
		LoginView.render({bindings: bindings});
	}
	
	/**
	 * 登陆时发送验证码
	 */
	function sendMarkForm(){
		var _this = this;
		var username = $$('.login-page input[name="username"]').val();
        var password = $$('.login-page input[name="password"]').val();
        if(username && password){
        	var param = {staffCode:tool.aesEncrypt(username),password:tool.aesEncrypt(password)};//,appVersion:'1988.7.7'
        	app.f7.showIndicator();
			tool.appAjax(tool.appPath.emopPro+'base/h5/sendMark',param,function(data){
				if(data.state){
					$$(_this).attr('disabled','disabled');
					app.f7.alert('验证码已发送至 '+data.info +'');
				}else{
					privateErrorAlert(data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请先填写工号和密码后继续');
        }
	}
	
	/**
	 * 提交登陆验证逻辑
	 * @param {Object} e
	 */
	function submitLoginForm(e){
		var _this = this;
		var username = $$('.login-page input[name="username"]').val();
        var password = $$('.login-page input[name="password"]').val();
        var loginmark = $$('.login-page input[name="loginmark"]').val();
        var deviceInfo = {osName:app.f7.device.os,osVersion:app.f7.device.osVersion};//http://v1.framework7.io/docs/device-api.html
        if(username && password && loginmark){
        	var param = {staffCode:tool.aesEncrypt(username),password:tool.aesEncrypt(password),loginMark:tool.aesEncrypt(loginmark),appVersion:'1988.7.7',deviceInfo:tool.encode(JSON.stringify(deviceInfo))};
			app.f7.showIndicator();
			tool.appAjax(tool.appPath.emopPro+'base/h5/login',param,function(data){
				if(data.state){
					tool.setUser(data.info);
					app.router.load('home');
					app.f7.closeModal('.login-screen');
				}else{
					privateErrorAlert(data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请完整填写登陆信息后继续');
        }
	}
	
	/**
	 * 重置密码时发送验证码
	 */
	function clickResetMarkBtn(){
		var _this = this;
		var username = $$('.popup-reset-password input[name="staffCode"]').val();
        var phoneno = $$('.popup-reset-password input[name="phoneNo"]').val();
        if(username && phoneno){
        	var param = {staffCode:tool.aesEncrypt(username),phoneNo:tool.aesEncrypt(phoneno)};
        	app.f7.showIndicator();
			tool.appAjax(tool.appPath.emopPro+'base/h5/sendResetMark',param,function(data){
				if(data.state){
					$$(_this).attr('disabled','disabled');
					app.f7.alert('验证码已发送至 '+data.info +'');
				}else{
					privateErrorAlert(data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请先填写工号和手机号码后继续');
        }
	}
	
	/**
	 * 重置密码时验证逻辑
	 */
	function clickResetPasswordBtn(){
		var _this = this;
		var username = $$('.popup-reset-password input[name="staffCode"]').val();
        var phoneno = $$('.popup-reset-password input[name="phoneNo"]').val();
        var loginmark = $$('.popup-reset-password input[name="loginMark"]').val();
        var password = $$('.popup-reset-password input[name="password"]').val();
        if(username && phoneno && loginmark && password){
        	var param = {staffCode:tool.aesEncrypt(username),phoneNo:tool.aesEncrypt(phoneno),
        		loginMark:tool.aesEncrypt(loginmark),password:tool.aesEncrypt(password)};
			app.f7.showIndicator();
			tool.appAjax(tool.appPath.emopPro+'base/h5/resetPassword',param,function(data){
				if(data.state){
					clickCloseResetpwdBtn();
				}else{
					privateErrorAlert(data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请完整填写表单信息后继续');
        }
	}
	
	/**
	 * 关闭修改密码的弹出窗口
	 */
	function clickCloseResetpwdBtn(){
		$$('.popup-reset-password form')[0].reset();
		$$('.popup-reset-password .submit-sendmark-button').removeAttr('disabled');
		app.f7.closeModal('.popup-reset-password');
	}
	
	/**
	 * 通用异常提醒逻辑
	 */
	function privateErrorAlert(dcode){
		if("LOCK_ERROR" == dcode){
		    app.f7.alert("用户被锁定,请稍后再试或联系管理员解锁.");
		}else if("USERCODE_ERROR" == dcode){
			app.f7.alert("登陆工号错误,请提供准确的登陆工号.");
		}else if("IMGCODE_ERROR" == dcode){
			app.f7.alert("图形验证码错误,错误10次将被锁定1小时.");
		}else if("PASSWORD_ERROR" == dcode){
	        app.f7.alert("登陆密码错误,错误10次将被锁定1小时.");
	    }else if("ORGANIZE_ERROR" == dcode){
			app.f7.alert("用户归属机构错误,请联系管理员处理.");
		}else if("LOGIN_MARK_ERROR" == dcode){
			app.f7.alert("短信验证码错误，错误10次将被锁定1小时.");
		}else if("PHONE_NO_ERROR" == dcode){
			app.f7.alert("手机号码错误，错误10次将被锁定1小时.");
		}else if("PASSWORD_ISEASY" == dcode){
			app.f7.alert("新密码设置过于简单,请输入不少于6位的含大小写密码.");
		}else{
			app.f7.alert('服务器处理过程发生问题:'+dcode);
		}
	}
	
	return {
		init: init
	};
});