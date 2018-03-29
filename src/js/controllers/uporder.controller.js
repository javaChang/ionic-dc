(function(){
	'use strict';

	angular
		.module('app')
		.controller('UpOrderCtrl', UpOrderCtrl);

	UpOrderCtrl.$inject = ['$scope', '$stateParams'];
	function UpOrderCtrl($scope, $stateParams) {
		var vm = this;
        
                vm.init = init; // 初始化函数
                vm.getDeatial = getDeatial;
                // 调用初始化
                vm.init();
                
                /*
                 * 初始化页面数据
                 */
                function init() {
                   // vm.orderId = ;
                   vm.getDeatial($stateParams.orderId);
                }

                function getDeatial(orderId) {

                }
	}
})();


