(function(){
	'use strict';
	
	angular
		.module('app')
		.constant('serviceUrl', 'http://caiyiqiu.imwork.net:29950/route/route?url=' + encodeURIComponent('http://172.80.72.16:50003/WS_Server/Webservice'))
		.constant('serviceImgUrl', 'http://caiyiqiu.imwork.net:29950/dc');
		// .constant('serviceUrl', 'http://114.55.26.211:50003/WS_Server/Webservice');
})();


