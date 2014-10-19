 $('#go-btn').click(function(e) {
        var message = $('#message').val();
        if(message.length>0) {                    
            var wordArray = message.split(' ');
            for(var i=0; i<wordArray.length; i++) {
                if (i===0) { 
                    $('#words-collection ul').append('<li><a href="#" class="word active">' + wordArray[i] + '</a></li> ');
                } else {
                    $('#words-collection ul').append('<li><a href="#" class="word">' + wordArray[i] + '</a></li> ');
                }

                 $('#preview #gifs-row').append("<div id='gif-" + i + "' class='col-sm-3'></div>");
            }
            eval(" $('#words-collection li').click(function(e) { e.preventDefault(); if(!$(this).find('a').hasClass('active')) { $('.word').removeClass('active');$(this).find('a').toggleClass('active');} });");

            $('#home').hide();
            $('#code-message').show();                  
            //var gifsArray = getGifs(wordArray[0]);
            
            getGifs(wordArray[0].toString());
        }
    });

    $('#words-collection li').click(function(e) {
        e.preventDefault();
        if(!$(this).find('a').hasClass('active')) {    
            $('.word').removeClass('active');
            $(this).find('a').toggleClass('active');
        }          

        var wordText = $(this).html();
        //hide other rows
        //$('.gifs').append()
    });

    //this script to always be evaluated when adding new pictures. 
    //resize()

var renderGifs = function() {
    $('.gif-img').css('min-height', '170px').css('max-height', '200px');
    $('.gif-img').height($('.gif-img').closest('.row').height());

    $('.source-button').click(function(e) {
        e.preventDefault();
        var selectedWordInd = $('.word.active').parent().index();
        if($(this).html()==='Using') {

            $(this).parent().removeClass('overlay');
            $(this).html('Use');
            $(this).css('visibility', 'hidden');
            $(this).siblings('img').removeClass(selectedWordInd + '-used');

        } else {   

            $('.img-wrapper').removeClass('overlay');
            $('.source-button').html('Use');
            $('.source-button').css('visibility', 'hidden');
            $(this).parent().addClass('overlay');
            $(this).html('Using');
            $(this).css('visibility', 'visible');
            $(this).siblings('img').addClass(selectedWordInd + '-used');
        }
    });
}

    $('#preview-btn').click(function(e) {
        e.preventDefault();

    });

var getGifs = function(word) {
  var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=dc6zaTOxFJmzC&limit=50');
	xhr.done(function(data) { 
		var linksArray = new Array(50);
		for(var i = 0; i<50; i++){
 			var a= data.data[i].images.fixed_height.url;
 			linksArray[i] = a; 			
 		}
 		 for (var i=0; i<50; i++) {                
                   
             $('#gifs .row').append('<div class="col-sm-3"><div class="img-wrapper"><img class="col-sm-12 gif-img" src="' + 
                                    linksArray[i]+  '"/>' +
                                   '<div class="source-button btn btn-primary btn-sm">Use</div></div></div>');               
            }
             renderGifs();
 	});
}