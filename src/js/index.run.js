(function(){
	'use strict';

	angular
		.module('app')
		.run(init)
		.run(dateTimePicker);

	function init($rootScope, $ionicLoading, $http, dataService) {
		
		// $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode('tomcat' + ':' + 'tomcat');  
		$rootScope.isSbumit = false;

		// $rootScope.userId = 'jiangwj';
		// $rootScope.shopDate = '2014-11-13';


		// if(navigator.platform == 'Win32') {
		// 	$rootScope.ssoTicket = 'ssoTicket';
		// } else {
		// 	ns.ready({
		// 		pluginInit: function() {
		// 			ns.runtime.userinfo({
		// 				onSuccess: function(data) {								
		// 					$rootScope.userId = st['obj']['userAgencyJobs'][0]['userId'];
		// 					$rootScope.realName = st['obj']['user'].realName;
		// 					$rootScope.userName = st['obj']['user'].userName;
		// 				},
		// 				onFail: function(msg) {
		// 					console.log('推送异常：获取ssoTicket失败', JSON.stringify(msg));
		// 					alert('推送异常：获取用户信息失败', JSON.stringify(msg));
		// 				}
		// 			});
		// 		}
		// 	});
	 //    }
	}

	function dateTimePicker($ionicPickerI18n) {
		$ionicPickerI18n.weekdays = ['日', '一', '二', '三', '四', '五', '六'];
		$ionicPickerI18n.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		$ionicPickerI18n.ok = '确认';
		$ionicPickerI18n.cancel = '取消';
		$ionicPickerI18n.okClass = 'button-energized';
		$ionicPickerI18n.cancelClass = 'button-stable';
	}
})();

