(function() {
	'use strict';

	angular
		.module('app')
		.factory('dataService', dataService)
		.factory('toolService', toolService);

	/* dataService */
	function dataService($http, serviceUrl ) {

		var service = {
            getUserValidation: getUserValidation,
            getMainList: getMainList,
            confirmOrder: confirmOrder,
            getOrderList: getOrderList,
            queryContent: queryContent,
            deleteOrder: deleteOrder,
            updateOrder: updateOrder
		};

		return service;

		/*
		 * ajax请求
		 */
		function ajaxReq(methodName, params, successCallback, errCallback) {
            var obj;
           obj = {
                method : 'POST',
                url: serviceUrl,
                data: params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var x2js = new X2JS(); 
			// console.log('请求：' + serviceUrl + JSON.stringify(params));
			return $http(obj).then(function(data) {
				// console.log('响应报文：' + JSON.stringify(data));
                 
                 var aftCnv = x2js.xml_str2json(data.data);  
				if(successCallback) {
                    console.log('响应报文1：' + JSON.stringify(aftCnv));
                    switch(methodName){
                        case 'getUserValidation':
                            successCallback(aftCnv.Envelope.Body.getUserValidationResponse.return);
                            break;
                        case 'getMainList':
                            successCallback(aftCnv.Envelope.Body.getMainListResponse.return);
                            break;
                        case 'confirmOrder':
                            successCallback(aftCnv.Envelope.Body.confirmOrderResponse.return);
                            break;
                        case 'getOrderList':
                            successCallback(aftCnv.Envelope.Body.getOrderListResponse.return);
                            break;
                        case 'queryContent':
                            successCallback(aftCnv.Envelope.Body.queryContentResponse.return);
                            break;
                        case 'deleteOrder':
                            successCallback(aftCnv.Envelope.Body.deleteOrderResponse.return);
                            break;
                        case 'updateOrder':
                            successCallback(aftCnv.Envelope.Body.updateOrderResponse.return);
                            break;

                    }
					
				}
			}).catch(function(data, status, headers, config) {
                // console.log('响应报文3：' + JSON.stringify(data));
				if(errCallback) {
					errCallback(data);
				}
				//console.error('服务器错误，请稍后再试！' + status);
			});
		}

        /*
         *  验证用户
         */

        function getUserValidation(userId, userName, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                        + '<soapenv:Header/>'
                        + ' <soapenv:Body>'
                        + '  <ser:getUserValidation>'
                        + '   <arg0>' + userId + '</arg0>'
                        + '   <arg1>' + userName + '</arg1>'
                        + ' </ser:getUserValidation>'
                        + '</soapenv:Body>'
                        + '</soapenv:Envelope>';
            return ajaxReq('getUserValidation', params, success, err);
        }

        /*
         *  获取列表
         */
        function getMainList(date, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                      +  '<soapenv:Header/>'
                       +  '<soapenv:Body>'
                          +  '<ser:getMainList>'
                             +  '<arg0>' + date + '</arg0>'
                          +  '</ser:getMainList>'
                       +  '</soapenv:Body>'
                    +  '</soapenv:Envelope>';

            return ajaxReq('getMainList',params, success, err);
        }


        function confirmOrder(userId, dateTake, goodsId, goodsNum, orderPrice, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                        +  '<soapenv:Header/>'
                        +  '<soapenv:Body>'
                        +  '<ser:confirmOrder>'
                        +   '<arg0>' + userId + '</arg0>'
                        +   '<arg1>' + dateTake + '</arg1>'
                        +   '<arg2>' + goodsId + '</arg2>'
                        +   '<arg3>' + goodsNum + '</arg3>'
                        +   '<arg4>' + orderPrice + '</arg4>'
                        +  '</ser:confirmOrder>'
                        +  '</soapenv:Body>'
                        + '</soapenv:Envelope>';
            return ajaxReq('confirmOrder', params, success, err);
        }

        function getOrderList(userId, startPage, endPage, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                       + '<soapenv:Header/>'
                       + '<soapenv:Body>'
                       + '<ser:getOrderList>'
                       + '<arg0>' + userId + '</arg0>'
                       + '<arg1>' + startPage + '</arg1>'
                       + '<arg2>' + endPage + '</arg2>'
                       + '</ser:getOrderList>'
                       + ' </soapenv:Body>'
                       + '</soapenv:Envelope>';
            return ajaxReq('getOrderList', params, success, err);
        }

        function queryContent(searchVal, dateQuery, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                       + '<soapenv:Header/>'
                       + '<soapenv:Body>'
                       + '<ser:queryContent>'
                       + '<arg0>' + searchVal + '</arg0>'
                       + '<arg1>' + dateQuery + '</arg1>'
                       + '</ser:queryContent>'
                       + ' </soapenv:Body>'
                       + '</soapenv:Envelope>';
            return ajaxReq('queryContent', params, success, err);
        }

        function deleteOrder(orderId, goodsId, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                        + '<soapenv:Header/>'
                        + '<soapenv:Body>'
                        + '<ser:deleteOrder>'
                        + '<arg0>' + orderId + '</arg0>'
                        + '<arg1>' + goodsId + '</arg1>'
                        + '</ser:deleteOrder>'
                        + '</soapenv:Body>'
                        + '</soapenv:Envelope>';
            return ajaxReq('deleteOrder', params, success, err);
        }

        function updateOrder(orderId, orderList, success, err){
            var params = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">'
                        + '<soapenv:Header/>'
                        + '<soapenv:Body>'
                        + '<ser:updateOrder>'
                        + '<arg0>?</arg0>'
                        + '<arg1>?</arg1>'
                        + '<arg2>?</arg2>'
                        + '<arg3>?</arg3>'
                        + '<arg4>?</arg4>'
                        + '</ser:updateOrder>'
                        + '</soapenv:Body>'
                        + '</soapenv:Envelope>';
            return ajaxReq('updateOrder', params, success, err);
        }
	}

    /* toolService */
    function toolService() {
        var toolFn = {
            setLocalStorage: setLocalStorage, //存储数据到local
            getLocalStorage: getLocalStorage, //获取local存储数据
            delLocalStorage: delLocalStorage, //删除local数据
            delAllLocalStorage: delAllLocalStorage //清空local数据
        };

        return toolFn;

        function setLocalStorage(name, value) {
            try {
                localStorage.setItem(name, JSON.stringify(value));
            } catch(oException) {
                if(oException.name == 'QuotaExceededError') {
                    console.log('超出本地存储限额！');
                    //如果历史信息不重要了，可清空后再设置
                    localStorage.clear();
                    localStorage.setItem(name, JSON.stringify(value));
                }
            }
        }

        function getLocalStorage(name) {
            var jsonObj = localStorage.getItem(name);
            try {
                return JSON.parse(jsonObj);
            } catch(e) {
                return jsonObj;
            }
        }

        function delLocalStorage(name) {
            localStorage.removeItem(name);
        }

        function delAllLocalStorage() {
            localStorage.clear();
        }
	}
})();