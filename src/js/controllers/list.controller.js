(function(){
	'use strict';

	angular
		.module('app')
		.controller('ListCtrl', ListCtrl);

	ListCtrl.$inject = ['$scope', '$rootScope', 'dataService', '$stateParams', '$state', '$ionicPopup', 'serviceImgUrl'];
	function ListCtrl($scope, $rootScope, dataService, $stateParams, $state, $ionicPopup, serviceImgUrl) {
		var vm = this;
        
        vm.init = init; // 初始化函数
        vm.getDatas = getDatas; // 获取数据
        vm.cancelOrder = cancelOrder;
        vm.goDetail = goDetail;
        vm.getSelect = getSelect;
        vm.goBack = goBack;

        vm.startPage = 0;
        vm.endPage = 9;
        vm.isAction = false;

        // 调用初始化
        vm.init();
        
        /*
         * 初始化页面数据
         */
        function init() {

            // 调用获取数据
            vm.getDatas();
        }

        function goBack(){
            $state.go('main');
        }

        // 获取数据
        function getDatas() {
            dataService.getOrderList($rootScope.userId,  vm.startPage, vm.endPage, function(msg){
                // console.log(JSON.stringify(eval('(' + msg + ')')));
                vm.isAction = true;
                var orderList = eval('(' + msg + ')');
                vm.listData = [];

                for(var i = 0; i < orderList.length; i ++ ){
                    var dataList = {
                        'dateTake': orderList[i].dateTake.split(' ')[0],
                        'orderId': orderList[i].orderId,
                        'sunGoods': 0,
                        'orderList':[]
                    };
                    var orderDeatail = {
                        'orderId': orderList[i].orderId,
                        'goodsId': orderList[i].goodsId,
                        'goodsPic': serviceImgUrl + orderList[i].goodsPic,
                        'goodsName': orderList[i].goodsName,
                        'orderStatus': orderList[i].orderStatus,
                        'totalPrice': orderList[i].totalPrice,
                        'goodsPrice': orderList[i].goodsPrice,
                        'goodsNum': orderList[i].goodsNum,
                        'dateOrder': orderList[i].dateOrder.substring(0,orderList[i].dateOrder.length - 2)
                    };
                    if(vm.listData.length <= 0){
                        vm.listData.push(dataList);
                        vm.listData[0].orderList.push(orderDeatail);
                    }else{
                        var isListData = true;
                        for(var j = 0 ; j < vm.listData.length ; j ++){
                            if(vm.listData[j].orderId == orderList[i].orderId){
                                isListData = false;
                                vm.listData[j].orderList.push(orderDeatail);
                            }
                        }
                        if(isListData){
                            vm.listData.push(dataList);
                            vm.listData[vm.listData.length - 1].orderList.push(orderDeatail);
                        }
                    }
                }

                for(var k = 0 ; k < vm.listData.length ; k ++){
                    var sum = 0;
                    for(var i = 0 ; i < vm.listData[k].orderList.length ; i++){
                        var sumPrice = vm.listData[k].orderList[i].goodsNum * vm.listData[k].orderList[i].goodsPrice;
                        sum = sum + Number(sumPrice);
                    }
                    vm.listData[k].sunGoods = sum;
                }
            },function(err){

            });
        }

        //取消订单
        function cancelOrder(orderId, goodsId){
            var confirmPopup = $ionicPopup.confirm({
               title: '提示',
               template: '<b style="font-size:16px;">你确认取消订单吗？</b>',
               okText: '确定',
               cancelText: '取消'
             });
             confirmPopup.then(function(res) {
               if(res) {
                 dataService.deleteOrder(orderId, goodsId,function(msg){
                    msg = eval('(' + msg + ')');
                    if(msg[0].isSucceed == 'true'){
                        vm.getDatas();
                    }
                },function(err){

                });
               }
             });
            
        } 

        function getSelect(){
            // vm.startPage += num;
            vm.endPage += 10;
            dataService.getOrderList($rootScope.userId,  vm.startPage, vm.endPage, function(msg){ 
                console.log(JSON.stringify(eval('(' + msg + ')')));
                var orderList = eval('(' + msg + ')');
                vm.listData = [];
                for(var i = 0; i < orderList.length; i ++ ){
                    var dataList = {
                        'dateTake': orderList[i].dateTake.split(' ')[0],
                        'orderId': orderList[i].orderId,
                        'sunGoods': 0,
                        'orderList':[]
                    };
                    var orderDeatail = {
                        'orderId': orderList[i].orderId,
                        'goodsId': orderList[i].goodsId,
                        'goodsPic': serviceImgUrl + orderList[i].goodsPic,
                        'goodsName': orderList[i].goodsName,
                        'orderStatus': orderList[i].orderStatus,
                        'totalPrice': orderList[i].totalPrice,
                        'goodsPrice': orderList[i].goodsPrice,
                        'goodsNum': orderList[i].goodsNum,
                        'dateOrder': orderList[i].dateOrder.substring(0,orderList[i].dateOrder.length - 2)
                    };
                    if(vm.listData.length <= 0){
                        vm.listData.push(dataList);
                        vm.listData[0].orderList.push(orderDeatail);
                    }else{
                        var isListData = true;
                        for(var j = 0 ; j < vm.listData.length ; j ++){
                            if(vm.listData[j].orderId == orderList[i].orderId){
                                isListData = false;
                                vm.listData[j].orderList.push(orderDeatail);
                            }
                        }
                        if(isListData){
                            vm.listData.push(dataList);
                            vm.listData[vm.listData.length - 1].orderList.push(orderDeatail);
                        }
                    }
                }

                for(var k = 0 ; k < vm.listData.length ; k ++){
                    var sum = 0;
                    for(var i = 0 ; i < vm.listData[k].orderList.length ; i++){
                        var sumPrice = vm.listData[k].orderList[i].goodsNum * vm.listData[k].orderList[i].goodsPrice;
                        sum = sum + Number(sumPrice);
                    }
                    vm.listData[k].sunGoods = sum;
                }
            },function(err){

            });
        }

        //
        function goDetail(orderId){
            $state.go('uporder',{'orderId': orderId}) ;
        }  
	}
})();


