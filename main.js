$(function(){ 
	$('.search-input').keyup(function(e) {
		var searchString = $(this).val();
		(e.which == 13) && chrome.tabs.create({url: 'http://appcurl.com/?q=' + searchString});
		
		$('.bla').html($(this).val());

		(searchString.length > 2) && _searchApps(searchString, function(data) {
			$('.serp').html(_makeSerpHtml(data.result));
		},
			function(){
				$('.serp').html('Not found');
			}
		) || $('.serp').html('Enter min 3 chars')

	});

	$( '.app' ).live( 'click', function(){
		chrome.tabs.create({url: $(this).attr('name')});
	});

	var _searchApps = function(searchData, success_callback, error_callback) {  
		var data = {
			q: searchData
		}  	
   		return $.ajax({
   		    url: 'http://api.airomo.com/0/appcurl/qs?q=' + searchData,
   		    dataType: 'json',
   		    processData: false,
   		    contentType: 'application/json',
   		    success: function(data) {
   		        success_callback && success_callback.call(null, data);
   		    },
   		    error: function(rq, code, error) {
   		        var responseDecoded = ((rq.responseText && JSON.parse(rq.responseText)) || {});
   		        error_callback && error_callback.call(null, responseDecoded, code, error);
   		    }
   		});
	},
		_makeSerpHtml = function(data) {
			var serpHtml = '';
			data.forEach(function(app) {
				serpHtml += '<div class="app" name="http://airomo.com/apps/'+ app.id +'"><img src="'+ app.icon +'"></img><a href="http://airomo.com/apps/'+ app.id +'">' + app.title + '</br></div>';
			});
			return serpHtml;
	};
});
