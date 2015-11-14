function init(){
	/*NODE MODULES*/
	
	/* OWN MODULES:
	 * Note: NW.js does not support normal require for
	 * own modules.
	 * Either use direct path from index.html file 
	 * or process.cwd() i.e. main folder with package.json! 
	 */
	var rest = require('./../js/mi5-modules/rest');
	var moment = require('moment');
	
	global.$(global.window.document).ready(function(){
			rest.checkConnection()
				.then(function(ret){
					console.log(ret.status);
				});
			
			rest.getOrdersByStatus('done')
				.then(function(ret){
					console.log(ret);
				});
				
			console.log(moment(new Date(2015,08,09,10,22)).format());
			

	});
}