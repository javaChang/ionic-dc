(function(){
	'use strict';

	angular
		.module('app')
		.controller('SettlementCtrl', SettlementCtrl);

	SettlementCtrl.$inject = ['$scope', '$rootScope','$stateParams', 'dataService', '$state', '$ionicLoading'];
	function SettlementCtrl($scope,$rootScope, $stateParams, dataService, $state, $ionicLoading) {
		var vm = this;
        
                vm.init = init; // 初始化函数
                vm.submitShopping = submitShopping;
                vm.goBack = goBack;

                // 调用初始化
                vm.init();
                
                /*
                 * 初始化页面数据
                 * Author:CC
                 * Date:
                 */
                function init() {
                    vm.shopDate = $rootScope.shopDate;
                    vm.shopList = $stateParams.shoppingList;
                    vm.money = $stateParams.shoppingMoney;
                }

                function goBack(){
                    $state.go('main');
                }

                function submitShopping(){

                        var goodsId = '';
                        var goodsNum = '';
                        var goodsPrice = '';
                        
                        console.log(vm.shopList);
                        for(var i = 0 ; i < vm.shopList.length ; i ++){
                            if(goodsId == ''){
                                goodsId = vm.shopList[i].goodsId;
                                goodsNum = vm.shopList[i].goodsNum;
                                goodsPrice = vm.shopList[i].goodsPrice;
                            }else{
                                goodsId += '#' + vm.shopList[i].goodsId;
                                goodsNum += '#' + vm.shopList[i].goodsNum;
                                goodsPrice += '#' + vm.shopList[i].goodsPrice;
                            }
                        }

                        dataService.confirmOrder($rootScope.userId, $rootScope.shopDate, goodsId, goodsNum, goodsPrice,function(msg){
                                $rootScope.isSbumit = true;
                                msg = eval('(' + msg + ')');
                                if(msg[0].isSucceed == 'true'){
                                    $state.go('list');
                                }else{
                                    $ionicLoading.show({
                                        template: msg[0].error,
                                        noBackdrop: true,
                                        duration: 2000
                                    });
                                }
                        },function(err){

                        });
                }
	}
})();


