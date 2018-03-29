(function() {
	'use strict';
	
	angular
		.module('app')
		.filter('formatDate', formatDate)
		.filter('formatStatus', formatStatus)
		.filter('fromatIsShow', fromatIsShow)
		.filter('formatImg', formatImg)
		.filter('formatSub', formatSub);

	function formatDate() {
		return function(input, format) {
			var date = new Date(input);
			if(date != 'Invalid Date') {
				console.log('ssss-' + input);
				var f = format;
				f = f.replace('yyyy', date.getFullYear());
				f = f.replace('yy', (date.getFullYear() + '').substring(2, 4));
				f = f.replace('MM', (date.getMonth() + 1));
				f = f.replace('dd', date.getDate());
				f = f.replace('HH', date.getHours());
				f = f.replace('mm', date.getMinutes());
				f = f.replace('ss', date.getSeconds());
				f = f.replace('fff', date.getMilliseconds());

				console.log(f);
				return f;
			} else {
				return input;
			}
		};
	}

	function formatStatus() {
		return function(status) {
			var f = '订单成功';
			switch(status){
				case '0':
					f = '订单确认中';
					break;
				case '1':
					f = '订单确认';
					break;
				case '2':
					f = '订单已取消';
					break;
			}
			return f;
		};
	}


	function fromatIsShow(){
		return function(data){
			// 订单时间
			var date = new Date(data).getTime();
			// 当前时间
			var data1 = new Date();
			var f = true;

			if(date < data1.getTime()){
				f = false;
			}else{
				var data2 = data1.getFullYear() + '-' + data1.getMonth() + '-' + data1.getDate() + ' ' + '9:00:00';
				var data3 = new Date(data2);
				if(data1.getTime() >  data3.getTime()){
					f = true;
				}
			}

			return f;
		};
	}

	function formatImg(){
		return function(imgUrl){
			var f = 'img/goodsDefault.jpg';
			var pic = imgUrl.split('/');

			return 'img/' + pic[pic.length - 1];
		};
	}

	function formatSub(){
		return function(val){
			var f = val.substring(val.length - 2, val.length);
			if(f == '.0'){
				f = val.substring(0, val.length - 2);
			}
			return f;
		};
	}
}());