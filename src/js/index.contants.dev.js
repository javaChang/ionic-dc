(function(){
	'use strict';
	
	angular
		.module('app')
		.constant('serviceUrl', 'http://caiyiqiu.imwork.net:29950/route/route?url=' + encodeURIComponent('http://172.80.72.16:50003/WS_Server/Webservice'))
		.constant('serviceImgUrl', 'http://caiyiqiu.imwork.net:29950/dc')
		.factory('sagInterceptor', [function() {
	        return {
	            request: function(config) {
	                if (window.sagJsHelper && window.sagJsHelper.interceptRequest && typeof window.sagJsHelper.interceptRequest === 'function') {
	                    if ("POST" == config.method) {
	                        var date = new Date();
	                        var timestamp = date.getTime();
	 
	                        var url = config.url;
	                        if (url.indexOf('?') > 0) {
	                            config.url = config.url + "&sagreqid=" + timestamp;
	                        } else {
	                            config.url = config.url + "?sagreqid=" + timestamp;
	                        }
	 
	                        window.sagJsHelper.interceptRequest('' + timestamp, config.method, config.data, config.headers["Content-Type"]);
	                    }
	                }
	                
	                return config;
	            }
	        }
	    }])
	    .config(['$httpProvider', function($httpProvider) {
	        $httpProvider.interceptors.push('sagInterceptor');
	    }]);
		// .constant('serviceUrl', 'http://114.55.26.211:50003/WS_Server/Webservice');
})();


