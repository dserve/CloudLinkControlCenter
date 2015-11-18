/**
 *
 * @type {*|exports|module.exports}
 */

var config = require('./../../config.js');
var validStatus = config.order.validStatus;
var rest = require('./rest');
var moment = require('moment');


function init(){

}

init.prototype.Listen = function(){
	$("body").on('click', ".SetOrderStatusBtn", function(){
		var orderId = $(this).attr('name');
		var status = $(this).text();
		
		rest.updateOrderStatus(orderId, status)
			.then(function(ret){
				swal("status: "+ret.status, ret.description, "success");
			})
			.catch(function(err){
				console.log(err);
			});

		
		//.each(function(){
		//	console.log('Update Status of OrderId '+$(this).attr('name')+' to '+$(this).html());
		//});
			//$input.forEach(function(el){
			//	console.log('Update Status of OrderId '+el.attr('name')+' to '+el.html());
			//});
			//rest.updateOrderStatus(el.attr('name'), el.html())
			//.then(function(ret){
			//	alert(ret);
		
	});
};

module.exports = new init();