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
	}];

	function init() {
		LoginView.render({bindings: bindings});
	}
	
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
				}else if('USERCODE_OR_PASSWORD_ERROR' == data.code){
					app.f7.alert('用户名或密码不正确');
				}else if('USER_PHONE_NO_ERROR' == data.code){
					app.f7.alert('接受验证码的手机号码设置不合法');
				}else if('APP_VERSION_ERROR' == data.code){
					app.f7.alert('APP_VERSION_ERROR');
				}else{
					app.f7.alert('服务器处理过程发生问题:'+data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请先填写工号和密码后继续');
        }
	}
	
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
				}else if("LOCK_ERROR" == code){
				    app.f7.alert("用户被锁定,请稍后再试或联系管理员解锁.");
				}else if("USERCODE_ERROR" == code){
					app.f7.alert("登陆工号错误,请提供准确的登陆工号.");
				}else if("IMGCODE_ERROR" == code){
					app.f7.alert("图形验证码错误,错误10次将被锁定1小时.");
				}else if("PASSWORD_ERROR" == code){
			        app.f7.alert("登陆密码错误,错误10次将被锁定1小时.");
			    }else if("ORGANIZE_ERROR" == code){
					app.f7.alert("用户归属机构错误,请联系管理员处理.");
				}else if("LOGIN_MARK_ERROR" == code){
					app.f7.alert("短信验证码错误，错误10次将被锁定1小时.");
				}else if("PHONE_NO_ERROR" == code){
					app.f7.alert("手机号码错误,请联系管理员处理.");
				}else if("PASSWORD_ISEASY" == code){
					app.f7.alert("新密码设置过于简单,请输入不少于6位的含大小写密码.");
				}else{
					app.f7.alert('服务器处理过程发生问题:'+data.code);
				}
			},function(){
				
			},function(){
				app.f7.hideIndicator();
			});
        }else{
        	app.f7.alert('请完整填写登陆信息后继续');
        }
	}
	
	return {
		init: init
	};
});