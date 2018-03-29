(function(){
	'use strict';

	angular
		.module('app')
		.controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'dataService', '$ionicScrollDelegate', '$state', 'serviceImgUrl'];
	function SearchCtrl($scope,  $rootScope, $stateParams, dataService, $ionicScrollDelegate, $state, serviceImgUrl) {
		var vm = this;
        
                vm.init = init; // 初始化函数
                vm.getDate = getDate;
                vm.popupShow = popupShow;
                vm.popupImgShow = popupImgShow;
                vm.purchaseAdd = purchaseAdd;
                vm.purchaseReduce = purchaseReduce;
                vm.clearShoppingList = clearShoppingList;
                vm.goSettlement = goSettlement;
                vm.searchList = searchList;
                vm.goMain = goMain;


                vm.shoppingNum = 0;
                vm.sumMoney = 0;
                vm.shoppingList = [];

                // 调用初始化
                vm.init();


                vm.isPopupShow = false;
                vm.isImgShow = false;

                /*
                 * 初始化页面数据
                 * Author:CC
                 * Date:
                 */
                function init() {

                  vm.searchVal = $stateParams.searchVal;
                  
                   vm.getDate(vm.searchVal,'1');
                }


                function searchList(){
                  var evt = (evt) ? evt : window.event;
                  if(evt.keyCode == 13){
                    vm.getDate(vm.searchVal,'2');
                  }
                  
                }

                 function getDate(searchVal,status){
                  if(status == '1'){
                    vm.shoppingNum = $rootScope.shoppingNum;
                    vm.sumMoney = $rootScope.sumMoney;
                    vm.shoppingList = $rootScope.shoppingList;
                  }
                  
                  dataService.queryContent(searchVal, $rootScope.shopDate,function(msg){
                    //类别名称
                    vm.listType = [];
                    vm.listItem = eval('(' + msg + ')');
                    console.log(JSON.stringify(vm.listItem));
                    for(var i = 0 ; i < vm.listItem.length ; i ++){
                        var titleName = '';
                        if(vm.listItem[i].goodsClassS != undefined || vm.listItem[i].goodsClassS != ''){
                          titleName = vm.listItem[i].goodsClassS;
                        }else{
                          titleName = vm.listItem[i].goodsClassL;
                        }
                        // var pic = vm.listItem[i].goodsPic.split('/');
                        var goodsList = {
                          'titleName': titleName,
                          'listItemDate': [{
                            'goodsId': vm.listItem[i].goodsId,
                            'goodsName': vm.listItem[i].goodsName,
                            'goodsExp': vm.listItem[i].goodsExp,
                            'goodsInv': vm.listItem[i].goodsInv,
                            'goodsLimit': vm.listItem[i].goodsLimit,
                            'goodsPrice': vm.listItem[i].goodsPrice,
                            'goodsPic': serviceImgUrl + vm.listItem[i].goodsPic,
                            'outGoodsCount': vm.listItem[i].goodsInv - vm.listItem[i].outGoodsCount,
                            'goodsNum': 0
                          }]
                        };
                        vm.listType.push(goodsList);
                    }
                  },function(err){

                  });
                }

                function popupShow(){
                    if(vm.isPopupShow == false){
                        vm.isPopupShow = true;
                    } else {
                        vm.isPopupShow = false;
                    }
                }


                function popupImgShow(itemList) {
                   vm.popuData = itemList;
                   console.log(vm.popuData);
                   if(vm.isImgShow == false){
                        vm.isImgShow = true;
                    } else {
                        vm.isImgShow = false;
                    }
                }

                function purchaseAdd(itemList,goodsNum){

                    itemList.goodsNum += 1;
                    vm.shoppingNum += 1;
                    vm.sumMoney = vm.sumMoney + parseFloat(itemList.goodsPrice);

                    
                    console.log(vm.shoppingList.length);
                    if(vm.shoppingList.length <= 0){
                      vm.shoppingList.push(itemList);
                    }else{
                      var isShpping = false;
                      for(var i = 0; i < vm.shoppingList.length ; i ++){
                        if(itemList.goodsId == vm.shoppingList[i].goodsId){
                            isShpping = true;
                        }
                      }
                      if(isShpping == false){
                        vm.shoppingList.push(itemList);
                      }
                    }
                }


                function purchaseReduce(itemList,goodsNum){
                    itemList.goodsNum -= 1;
                    vm.shoppingNum -= 1;
                    vm.sumMoney = vm.sumMoney - parseFloat(itemList.goodsPrice);
                    console.log(itemList.goodsNum);
                    if(itemList.goodsNum <= 0){
                      for(var i = 0; i < vm.shoppingList.length ; i ++){
                        if(itemList.goodsId == vm.shoppingList[i].goodsId){
                            vm.shoppingList.splice(i,1);
                        }
                      }
                    }
                }

              function clearShoppingList() {
                vm.shoppingNum = 0;
                vm.shoppingList = [];
              }

              function goMain(){
                  $rootScope.shoppingNum = vm.shoppingNum;
                  $rootScope.sumMoney = vm.sumMoney;
                  $rootScope.shoppingList = vm.shoppingList;
                  $state.go('main');
              }

              function goSettlement(){
                $rootScope.shoppingNum = vm.shoppingNum;
                $rootScope.sumMoney = vm.sumMoney;
                $rootScope.shoppingList = vm.shoppingList;
                $state.go( 'settlement' , { 'shoppingList' : vm.shoppingList, 'shoppingDate': vm.dateShopping, 'shoppingMoney': vm.sumMoney } ) ;
              }
	}
})();

