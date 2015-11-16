/**
 *
 * @type {*|exports|module.exports}
 */

var config = require('./../../config.js');
var validStatus = config.order.validStatus;
var rest = require('./rest');
var moment = require('moment');
var update;

function init(){
	update = new Date();
}

init.prototype.initFields = function(){
	global.$('#CheckStatus').innerHTML = '';
	
	validStatus.forEach(function(item){
		var id = 'CheckStatus'+item.replace(/\s+/g, '');
		global.$('#CheckStatus').append('<input type="checkbox" id="'+id+'" checked>'+item+'</input>  ');
	});
	
	rest.getOrdersFiltered({})
		.then(function(ret){
			update = new Date();
			ret = ret.filter(function(el){
				return (typeof el.orderId != 'undefined');
			});
 			global.$('#orderTable').bootstrapTable({
				idField: 'orderId',
				columns: [{
					field: 'orderId',
					title: 'orderId',
					sortable: 'true',
					sortOrder: 'asc'
				},
				{
					field: 'recipeId',
					title: 'recipeId',
					sortable: 'true'
				},
				{
					field: 'marketPlaceId',
					title: 'origin',
					sortable: 'true'
				},
				{
					field: 'priority',
					title: 'priority',
					sortable: 'true',
					visible: 'false',
					cardVisible: 'false'
				},
				{
					field: 'status',
					title: 'status',
					sortable: 'true',
					cardVisible: 'true'
				},
				{
					field: 'estimatedTimeOfCompletion',
					title: 'remaining time',
					sortable: 'true'
				}],
				data: ret
			}); 
		})
		.catch(function(err){
			console.log(err);
		});
};

init.prototype.initModal = function(el){

	global.$('#orderModal').modal();
	global.$('#orderModalTitle').append("View Order "+el.orderId);//+ el.orderId;	
	global.$('#modalContent').append(JSON.stringify(el));
	
	$('#orderModalTable').bootstrapTable({
		cardView: 'true',
		columns:[{
			field: 'orderId',
			title: 'orderId'
		}],
		data: el
	});
	
/* 	rest.getCocktailDataByOrderId(el.orderId)
		.then(function(ret){
			console.log(el);
			console.log(ret);
			//for (var attrname in el) {ret[attrname] = el[attrname];}
			
			$('#orderModalTable').bootstrapTable({
				cardView: 'true',
				columns:[{
					field: 'orderId',
					title: 'orderId'
				}],
				data: el
			});
			
			$('#orderModal').modal();
		})
		.catch(function(err){
			console.log(err);
		}); */
};

/*init.prototype.initUpdateListener = function(){
	while(true){
		setTimeout(this.update, 5000);		
	}
};

init.prototype.update = function(){
	console.log('fired update');
	rest.getOrdersUpdatedSince(update)
	.then(function(ret){
		ret.forEach(function(item){
			console.log(item);
			$('#orderTable').bootstrapTable('updateRow', {
				index: {orderId: item.orderId},
				row: item
			});
		});
	});
};*/

module.exports = new init();