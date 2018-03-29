(function() {
	'use strict';
	
	angular
		.module('app')
		/*
		 * footer
		 * Author:yjp
		 * Date:2017-4-18
		 */
		.directive('header', function() {
			return {
				restrict: 'AE',
				replace: true,
				templateUrl: 'template/header.html',
				link: function(scope, ele, attr) {

				}
			};
		});
})();