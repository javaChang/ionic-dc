(function(){
	'use strict';
	
	angular
		.module('app')
		.config(['$stateProvider', '$urlRouterProvider', 'ionicDatePickerProvider', 
			function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
			var datePickerObj = {
	            inputDate: new Date(),
	            titleLabel: '选择日期',
	            setLabel: '确定',
	            todayLabel: '今天',
	            closeLabel: '关闭',
	            mondayFirst: false,
	            weeksList: ['日', '一', '二', '三', '四', '五', '六'],
	            monthsList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	            templateType: 'popup',
	            from: new Date(2009, 1, 1),
	            to: new Date(2058, 12, 31),
	            showTodayButton: true,
	            dateFormat: 'yyyy-MM-dd',
	            closeOnSelect: false,
	            disableWeekdays: []
	        };
	        ionicDatePickerProvider.configDatePicker(datePickerObj);

			//配置状态机的各个状态
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: 'template/main.html',
					controller: 'MainCtrl',
					cache:'false',
					controllerAs: 'vm'
				})
				.state('settlement', {
					url: '/settlement',
					params:{'shoppingList':'','shoppingDate':'','shoppingMoney':''},  
					templateUrl: 'template/settlement.html',
					controller: 'SettlementCtrl',
					controllerAs: 'vm'
				})
				.state('search', {
					url: '/search',
					params:{'searchVal':''},
					templateUrl: 'template/search.html',
					controller: 'SearchCtrl',
					controllerAs: 'vm'
				})
				.state('uporder', {
					url: '/uporder',
					params:{'orderId':''},
					templateUrl: 'template/uporder.html',
					controller: 'UpOrderCtrl',
					controllerAs: 'vm'
				})
				.state('list', {
					url: '/list',
					templateUrl: 'template/list.html',
					controller: 'ListCtrl',
					controllerAs: 'vm'
				})
				;

			$urlRouterProvider.otherwise('/main');
		}]);
})();

