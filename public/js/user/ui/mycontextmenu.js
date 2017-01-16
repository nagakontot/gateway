 "use strict";
 
        document.oncontextmenu = function() {return false; };
        $(document).mousedown(function(e) 
        {   if(e.button === 2) 
            {   $('.rightClick').removeClass('showing');
		        var n = $('.rightClick').clone(true);
		        $('.rightClick').fadeOut(200);
		        setTimeout(function(){$('.rightClick').css({top:e.pageY-100,left:e.pageX-100}).fadeIn(200).addClass('showing');},200);
            } 
	        else if(e.button === 0) 
	        {   setTimeout(function(){$('.rightClick').removeClass('showing').fadeOut(200);},200);
	        }
        });

        $('.rightClick .edit')    .click(function() {alert("Edit Button Pressed");});
        $('.rightClick .fav')     .click(function() {alert("Favourites Button Pressed");});
        $('.rightClick .help')    .click(function() {alert("Help Button Pressed");});

        $('.rightClick .quit')    .click(function() {window.location.href = "/user/logout";});
        $('.rightClick .reset')   .click(function() {alert("Reset Button Pressed");});
        $('.rightClick .settings').click(function() {alert("Settings Button Pressed");});
        
        