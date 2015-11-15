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
			$("body").on('click', "#getTime", function(e) {
				e.preventDefault();
				console.log(global.$('#updatedSinceDate').val());
				console.log($('#createdSinceTime').val());
				rest.getOrdersFiltered('done', $('#createdSinceTime').val().toString(), $('#updatedSinceDate').val().toString(), "['Cocktails']")
					.then(function(ret){
						console.log(ret);
					});

			});
		
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