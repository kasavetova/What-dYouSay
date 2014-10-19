var getGifs = function(word){
  //var word = 'ryan+gosling';
  var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=dc6zaTOxFJmzC&limit=50');
	xhr.done(function(data) { 
		var linksArray = [];
		for(var i = 0; i<50; i++){
			console.log('test');
 			console.log(a);
 			var a= data.data[i].images.fixed_height.url;
 			linksArray[i] = a;
 			
 		}
 		return linksArray;
 	});
}