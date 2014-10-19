
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
           enableWords();

            $('#home').hide();
            $('#code-message').show();                  
            //var gifsArray = getGifs(wordArray[0]);
            
            getGifs(wordArray[0].toString());
        }
    });

   var enableWords = function () {
       $('#words-collection li').click(function(e) {
        e.preventDefault();
        var wordText = $(this).html();
        $('#gifs .row').html('');
        getGifs(wordText);
        if(!$(this).find('a').hasClass('active')) {
           
            $('.word').removeClass('active');
            $(this).find('a').toggleClass('active');
            
                       
        }       
             
        
        //hide other rows
        //$('.gifs').append()
    });
   }

    //this script to always be evaluated when adding new pictures. 
    //resize()

var renderGifs = function() {
    $('.gif-img').css('min-height', '170px').css('max-height', '200px');
    $('.gif-img').height($('.gif-img').closest('.row').height());

    $('.source-button').click(function(e) {
        e.preventDefault();
        var selectedWordInd = $('.word.active').parent().index();
        var imgID = $(this).parent().attr('id');
        
        if($(this).html()==='Using') {

            $(this).parent().removeClass('overlay');
            $(this).html('Use');
            $(this).css('visibility', 'hidden');
            $(this).siblings('img').removeClass(selectedWordInd + '-used');
             $('#gif-' + imgID).html('');

        } else {   

            $('.img-wrapper').removeClass('overlay');
            $('.source-button').html('Use');
            $('.source-button').css('visibility', 'hidden');
            $(this).parent().addClass('overlay');
            $(this).html('Using');
            $(this).css('visibility', 'visible');
            $(this).siblings('img').addClass(selectedWordInd + '-used');
             $('#gif-' + id).append($(this).parent());
           
        }
    });
}

    $('#preview-btn').click(function(e) {
        e.preventDefault();

    });

var getGifs = function(word) {    
  var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=dc6zaTOxFJmzC&limit=16');
	xhr.done(function(data) { 
		var linksArray = new Array(16);
		for(var i = 0; i<16; i++){
 			var a= data.data[i].images.fixed_height.url;
 			linksArray[i] = a; 			
 		}
 		 for (var i=0; i<16; i++) {                
                   
             $('#gifs .row').append('<div class="col-sm-3"><div class="img-wrapper"><img id="' + i + '" class="col-sm-12 gif-img" src="' + 
                                    linksArray[i]+  '"/>' +
                                   '<div class="source-button btn btn-primary btn-sm">Use</div></div></div>');               
            }
             renderGifs();
 	});
}