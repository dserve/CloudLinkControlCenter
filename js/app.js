function init(){
	/*NODE MODULES*/
	var moment = require('moment');	
	/* OWN MODULES:
	 * Note: NW.js does not support normal require for
	 * own modules.
	 * Either use direct path from index.html file 
	 * or process.cwd() i.e. main folder with package.json! 
	 */
	var rest = require('./../js/mi5-modules/rest');
	var init = require('./../js/mi5-modules/init');
	var Listener = require('./../js/mi5-modules/Listener');

	
	global.$(global.window.document).ready(function(){
			init.update();
			init.initFields();
			Listener.Listen();

			//initFields.initUpdateListener();
		
			rest.checkConnection()
				.then(function(ret){
					console.log(ret.status);
				});
			
			rest.getOrdersByStatus('done')
				.then(function(ret){
					console.log(ret);
				});
				
			global.$('#orderTable').on('click-row.bs.table', function(row, el){
				console.log(el);
				
				init.initModal(el);

			});

			console.log(moment(new Date(2015,08,09,10,22)).format());
			
			window.setInterval(function(){
				init.update();
				$('#orderTable').bootstrapTable('refresh', {silent:true});
				console.log('refresh');
			},2000);
			

	});
}