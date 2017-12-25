define(['app'],function(app) {
	var $$ = Dom7;

	function init() {
		function myGod(id,w,n){
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
//					console.log(box.scrollTop);
				};
				setTimeout(arguments.callee,box.scrollTop%18?fq:w);
			};
		};
		
		myGod('.theme-asiainfo .marquee-notice-list',2000);
		
		//mapView.render();
	}
	
	return {
		init: init
	};
});