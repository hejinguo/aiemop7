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
        	var param = {staffCode:username,password:tool.encode(password)};//,appVersion:'1988.7.7'
        	app.f7.showIndicator();
			tool.appAjax('base/sendMark',param,function(data){
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
        var deviceInfo = {};//http://v1.framework7.io/docs/device-api.html
        if(username && password && loginmark){
        	var param = {staffCode:username,password:tool.encode(password),loginMark:loginmark,appVersion:'1988.7.7',deviceInfo:tool.encode(JSON.stringify(deviceInfo))};
			app.f7.showIndicator();
			tool.appAjax('base/login',param,function(data){
				if(data.state){
					tool.setUser(data.info);
					app.router.load('home');
					app.f7.closeModal('.login-screen');
				}else if('USERCODE_OR_PASSWORD_ERROR' == data.code){
					app.f7.alert('用户名或密码不正确');
				}else if('LOGIN_MARK_ERROR' == data.code){
					app.f7.alert('验证码不正确');
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
        	app.f7.alert('请完整填写登陆信息后继续');
        }
	}
	
	return {
		init: init
	};
});