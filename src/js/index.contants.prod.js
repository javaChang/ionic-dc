(function(){
	'use strict';
	
	angular
		.module('app')
		.constant('serviceUrl', 'http://172.80.72.15:8080/route/route?url=' + encodeURIComponent('http://172.80.72.16:50003/WS_Server/Webservice'))
		.constant('serviceImgUrl', 'http://172.80.72.15:8080/dc');;
})();


