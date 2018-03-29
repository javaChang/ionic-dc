(function(){
	'use strict';

	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', '$rootScope', 'dataService', '$ionicScrollDelegate', '$state', '$filter', 'ionicDatePicker', '$ionicLoading', '$location', '$anchorScroll', 'serviceImgUrl'];
	function MainCtrl($scope,  $rootScope, dataService, $ionicScrollDelegate, $state, $filter, ionicDatePicker, $ionicLoading, $location, $anchorScroll, serviceImgUrl) {
		var vm = this;
        
                vm.init = init; // 初始化函数
                vm.getDate = getDate;
                vm.popupShow = popupShow;
                vm.popupImgShow = popupImgShow;
                vm.purchaseAdd = purchaseAdd;
                vm.purchaseReduce = purchaseReduce;
                vm.clearShoppingList = clearShoppingList;
                vm.goSettlement = goSettlement;
                vm.goOrderList = goOrderList;
                vm.searchList = searchList;
                vm.dateOpen = dateOpen;
                vm.closeApp = closeApp;
                vm.gotoGoods = gotoGoods;
                vm.gotoBottom = gotoBottom;


                vm.shoppingNum = 0;  //总数量
                vm.sumMoney = 0;    //总价格
                vm.shoppingList = [];  // 商品列表
                vm.goodTypeStaus = 0;  // 大类初始化
                vm.goodTypeClassLStaus = 0; //小类初始化
                // 调用初始化
                vm.init();


                vm.isPopupShow = false;  // 弹出购物车
                vm.isImgShow = false;   // 弹出商品图

                /*
                 * 初始化页面数据
                 */
                function init() {
                   if($rootScope.shopDate != undefined){
                      vm.dateShopping = $rootScope.shopDate;
                   }else{
                      var dd = new Date();  
                      if(dd.getHours() >= 9){
                        dd = dd.setDate(dd.getDate() + 1);   
                      }
                      dd = $filter('date')(dd, 'yyyy-MM-dd EEE HH:mm:ss');
                      // console.log(dd);
                      vm.dateShopping = dd.split(' ')[0];
                      $rootScope.shopDate = vm.dateShopping;
                   }
                   
                   

                    // $rootScope.userId = 'jifz';
                    // $rootScope.userName = '吉凤梓';
                    // $rootScope.shopDate = '2018-03-23';

                   if($rootScope.userId == undefined){
                      ns.ready({
                        pluginInit: function() {
                          ns.runtime.userinfo({
                            onSuccess: function(data) {  
                              
                              $rootScope.userId = data['obj']['user'].userName;
                              $rootScope.userName = data['obj']['user'].realName;

                              dataService.getUserValidation($rootScope.userId,$rootScope.userName,function(msg){
                                  msg = eval('(' + msg + ')');
                                  if(msg[0].error != 'undefined'){
                                      vm.getDate();
                                  }else{
                                    $ionicLoading.show({
                                        template: msg[0].error,
                                        noBackdrop: true,
                                        duration: 2000
                                    });
                                  }
                              },function(err){

                              });
                            },
                            onFail: function(msg) {
                              console.log('服务异常：获取用户信息失败', JSON.stringify(msg));
                              alert('服务异常：获取用户信息失败', JSON.stringify(msg));
                            }
                          });
                        }
                      });
                   }else{
                      if($rootScope.shoppingNum != undefined && $rootScope.isSbumit == false){
                          vm.shoppingNum = $rootScope.shoppingNum;
                          vm.sumMoney = $rootScope.sumMoney;
                          vm.shoppingList = $rootScope.shoppingList;
                          vm.listType = $rootScope.listType ;
                          vm.listGoodsType = $rootScope.listGoodsType;
                      }else{
                          getDate();
                      }
                   }
               
                }


                function getDate(){
                  
                  if($rootScope.isSbumit == true){
                      vm.shoppingNum = 0;  //总数量
                      vm.sumMoney = 0;    //总价格
                      vm.shoppingList = [];  // 商品列表
                      vm.goodTypeStaus = 0;  // 大类初始化
                  }
                
                  dataService.getMainList(vm.dateShopping, function(msg){
                          //类别名称
                          vm.listType = [];
                          vm.listGoodsType = [];
                          vm.listItem = eval('(' + msg + ')');
                          console.log(JSON.stringify(vm.listItem));

                          for(var i = 0 ; i < vm.listItem.length ; i ++){
                              var goodsType = {
                                'goodsClassL': (vm.listItem[i].goodsClassL).substring(0,2),
                                'goodsClassLId':  vm.listItem[i].goodsClassLId,
                                'goodsShoppingSum': 0,
                                'goodsClassSList':[]
                              };
                              if(vm.listGoodsType.length <= 0){
                                vm.listGoodsType.push(goodsType);
                              }else{
                                var isPush = true;
                                for(var j = 0;j < vm.listGoodsType.length ; j++ ){
                                  if(vm.listItem[i].goodsClassLId == vm.listGoodsType[j].goodsClassLId){
                                      isPush = false;
                                      var goodsClassL = {
                                          'goodsClassSId': vm.listItem[i].goodsClassSId,
                                          'goodsClassS': vm.listItem[i].goodsClassS
                                      };
                                      if(vm.listGoodsType[j].goodsClassSList.length <= 0){
                                        (vm.listGoodsType[j].goodsClassSList).push(goodsClassL);
                                      }else{
                                        var isClassSListPush = true;
                                        for(var k = 0; k < vm.listGoodsType[j].goodsClassSList.length ; k ++){
                                          if(vm.listItem[i].goodsClassSId == vm.listGoodsType[j].goodsClassSList[k].goodsClassSId){
                                            isClassSListPush = false;
                                          }
                                        }
                                        if(isClassSListPush == true){
                                          (vm.listGoodsType[j].goodsClassSList).push(goodsClassL);
                                        }
                                      }
                                  }
                                }
                                if(isPush == true){
                                  vm.listGoodsType.push(goodsType);
                                }
                              }
                            
                              var goodsList = {
                                'titleName': vm.listItem[i].goodsClassS,
                                'titleId' :vm.listItem[i].goodsClassSId,
                                'listItemDate': []
                              };
            
                              var detailLsit = {
                                  'goodsId': vm.listItem[i].goodsId,
                                  'goodsName': vm.listItem[i].goodsName,
                                  'goodsExp': vm.listItem[i].goodsExp,
                                  'goodsInv': vm.listItem[i].goodsInv,
                                  'goodsLimit': vm.listItem[i].goodsLimit,
                                  'goodsPrice': vm.listItem[i].goodsPrice,
                                  'goodsPic': serviceImgUrl + vm.listItem[i].goodsPic,
                                  'outGoodsCount': vm.listItem[i].goodsInv - vm.listItem[i].outGoodsCount,
                                  'goodsNum': 0
                              };
                              if(vm.listType.length <= 0 ){
                                vm.listType.push(goodsList);
                                
                                vm.listType[0].listItemDate.push(detailLsit);
                              }else{
                                var isPushDetail = true;
                                for (var j = 0;j < vm.listType.length ; j++ ) {
                                  if(vm.listItem[i].goodsClassS == vm.listType[j].titleName){
                                    isPushDetail = false;
                                    if(vm.listType[j].listItemDate.length <= 0){
                                        vm.listType[j].listItemDate.push(detailLsit);
                                    }else{
                                      var isDeatialPush = true;
                                      for(var k = 0 ;k < vm.listType[j].listItemDate.length; k++){
                                        if(vm.listItem[i].goodsId == vm.listType[j].listItemDate[k].goodsId){
                                          isDeatialPush = false;
                                        }
                                      }
                                      if(isDeatialPush){
                                        vm.listType[j].listItemDate.push(detailLsit);
                                      }
                                    }
                                  }
                                }
                                if(isPushDetail){
                                  vm.listType.push(goodsList);
                                  vm.listType[vm.listType.length - 1].listItemDate.push(detailLsit);
                                }
                              }
                          }
                          $rootScope.listType = vm.listType;
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
                    console.log(itemList.goodsPrice);
                    vm.sumMoney +=  Number(itemList.goodsPrice);
                    // vm.sumMoney = vm.sumMoney.toFixed(2)
                    vm.listGoodsType[vm.goodTypeStaus].goodsShoppingSum += 1;
                    
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
                    vm.listGoodsType[vm.goodTypeStaus].goodsShoppingSum -= 1;

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


              function searchList(){
                $rootScope.shoppingNum = vm.shoppingNum;
                $rootScope.sumMoney = vm.sumMoney;
                $rootScope.shoppingList = vm.shoppingList;
                $rootScope.listGoodsType = vm.listGoodsType;
                var evt = (evt) ? evt : window.event;
                if(evt.keyCode == 13){
                  $state.go('search',{'searchVal': vm.searchVal}) ;
                }
                
              }

              function goSettlement(){
                $rootScope.shoppingNum = vm.shoppingNum;
                $rootScope.sumMoney = vm.sumMoney;
                $rootScope.shoppingList = vm.shoppingList;
                $rootScope.listGoodsType = vm.listGoodsType;

                $state.go( 'settlement' , { 'shoppingList' : vm.shoppingList, 'shoppingDate': vm.dateShopping, 'shoppingMoney': vm.sumMoney } ) ;
              }

              function goOrderList(){
                $rootScope.shoppingNum = vm.shoppingNum;
                $rootScope.sumMoney = vm.sumMoney;
                $rootScope.shoppingList = vm.shoppingList;
                $rootScope.listGoodsType = vm.listGoodsType;

                $state.go('list') ;
              }


              function dateOpen(){
                  var yesMonth = new Date().getFullYear() + '-01' + '-01';
                  var dateObj = {
                    callback: function (val) {
                        vm.dateShopping = $filter('date')(val, 'yyyy-MM-dd');

                        $rootScope.shopDate = vm.dateShopping;
                        
                        vm.shoppingNum = 0;  //总数量
                        vm.sumMoney = 0;    //总价格
                        vm.shoppingList = [];  // 商品列表
                        vm.goodTypeStaus = 0;  // 大类初始化

                        dataService.getMainList(vm.dateShopping, function(msg){
                          //类别名称
                          vm.listType = [];
                          vm.listGoodsType = [];
                          vm.listItem = eval('(' + msg + ')');
                          console.log(JSON.stringify(vm.listItem));

                          for(var i = 0 ; i < vm.listItem.length ; i ++){
                              var goodsType = {
                                'goodsClassL': (vm.listItem[i].goodsClassL).substring(0,2),
                                'goodsClassLId':  vm.listItem[i].goodsClassLId,
                                'goodsImg': 'img/icon-' + i + '.png',
                                'goodsShoppingSum': 0,
                                'goodsClassSList':[]
                              };
                              if(vm.listGoodsType.length <= 0){
                                vm.listGoodsType.push(goodsType);
                              }else{
                                var isPush = true;
                                for(var j = 0;j < vm.listGoodsType.length ; j++ ){
                                  if(vm.listItem[i].goodsClassLId == vm.listGoodsType[j].goodsClassLId){
                                      isPush = false;
                                      var goodsClassL = {
                                          'goodsClassSId': vm.listItem[i].goodsClassSId,
                                          'goodsClassS': vm.listItem[i].goodsClassS
                                      };
                                      if(vm.listGoodsType[j].goodsClassSList.length <= 0){
                                        (vm.listGoodsType[j].goodsClassSList).push(goodsClassL);
                                      }else{
                                        var isClassSListPush = true;
                                        for(var k = 0; k < vm.listGoodsType[j].goodsClassSList.length ; k ++){
                                          if(vm.listItem[i].goodsClassSId == vm.listGoodsType[j].goodsClassSList[k].goodsClassSId){
                                            isClassSListPush = false;
                                          }
                                        }
                                        if(isClassSListPush == true){
                                          (vm.listGoodsType[j].goodsClassSList).push(goodsClassL);
                                        }
                                      }
                                  }
                                }
                                if(isPush == true){
                                  vm.listGoodsType.push(goodsType);
                                }
                              }
                            
                              var goodsList = {
                                'titleName': vm.listItem[i].goodsClassS,
                                'titleId' :vm.listItem[i].goodsClassSId,
                                'listItemDate': []
                              };
                      
                              var detailLsit = {
                                  'goodsId': vm.listItem[i].goodsId,
                                  'goodsName': vm.listItem[i].goodsName,
                                  'goodsExp': vm.listItem[i].goodsExp,
                                  'goodsInv': vm.listItem[i].goodsInv,
                                  'goodsLimit': vm.listItem[i].goodsLimit,
                                  'goodsPrice': vm.listItem[i].goodsPrice,
                                  'goodsPic': serviceImgUrl + vm.listItem[i].goodsPic,
                                  'outGoodsCount': vm.listItem[i].goodsInv - vm.listItem[i].outGoodsCount,
                                  'goodsNum': 0
                              };
                              if(vm.listType.length <= 0 ){
                                vm.listType.push(goodsList);
                                
                                vm.listType[0].listItemDate.push(detailLsit);
                              }else{
                                var isPushDetail = true;
                                for (var j = 0;j < vm.listType.length ; j++ ) {
                                  if(vm.listItem[i].goodsClassS == vm.listType[j].titleName){
                                    isPushDetail = false;
                                    if(vm.listType[j].listItemDate.length <= 0){
                                        vm.listType[j].listItemDate.push(detailLsit);
                                    }else{
                                      var isDeatialPush = true;
                                      for(var k = 0 ;k < vm.listType[j].listItemDate.length; k++){
                                        if(vm.listItem[i].goodsId == vm.listType[j].listItemDate[k].goodsId){
                                          isDeatialPush = false;
                                        }
                                      }
                                      if(isDeatialPush){
                                        vm.listType[j].listItemDate.push(detailLsit);
                                      }
                                    }
                                  }
                                }
                                if(isPushDetail){
                                  vm.listType.push(goodsList);
                                  vm.listType[vm.listType.length - 1].listItemDate.push(detailLsit);
                                }
                              }
                          }
                          $rootScope.listType = vm.listType;
                        },function(err){

                        });
                      },
                      from: new Date(),
                      to: new Date(new Date().getFullYear(), 11, 31),
                      inputDate: new Date(),
                      mondayFirst: true,
                      closeOnSelect: false,
                      dateFormat: 'yyyy-MM-dd',
                      templateType: 'popup'
                    };
                    ionicDatePicker.openDatePicker(dateObj);

                }

                function closeApp() {
                    ns.runtime.closePage();
                }

                function gotoGoods(status){
                  vm.goodTypeStaus = status;
                  vm.goodTypeClassLStaus = 0;
                  // var idTop = document.getElementById(id).offsetParent.offsetTop;
                  // $ionicScrollDelegate.scrollTo(0,idTop);
                }


               function gotoBottom(id,status){
                  vm.goodTypeClassLStaus = status;
                  var idTop = document.getElementById(id).offsetParent.offsetTop;
                  $ionicScrollDelegate.scrollTo(0,idTop);
               }


	}
})();

