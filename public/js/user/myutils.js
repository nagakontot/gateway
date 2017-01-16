//////////////////////////////
        //http://psoug.org/snippet/Javascript-Javascript-quotFade-In-On-Clickquot_903.htm
        // Browser safe opacity handling function
        function setOpacity( value,id ) 
        {   document.getElementById(id).style.opacity = value / 10;
            document.getElementById(id).style.filter = 'alpha(opacity=' + value * 10 + ')';
        }
 
        function fadeInMyPopup() 
        {   for( var i = 0 ; i <= 100 ; i++ )
            setTimeout( 'setOpacity(' + (i / 10) + ')' , 8 * i );
        }
 
        function fadeOutMyPopup(id) 
        {   for( var i = 0 ; i <= 100 ; i++ ) 
            {   setTimeout( 'setOpacity(' + (10 - i / 10) + ')' , 8 * i );
            }
            setTimeout('closeMyPopup(id)', 800 );
        }
 
        function closeMyPopup(id) 
        {   document.getElementById(id).style.visibility = "hidden";
        }
 
        function fireMyPopup(id) 
        {    setOpacity( 0,id );
             document.getElementById(id).style.visibility = "visible";
             fadeInMyPopup(id);
        }
        
        //|//////////////////////////////////|
        //|usage:                            |
        //|//////////////////////////////////|
        //| <!--
        //|     <table id='styled_popup' NAME='styled_popup' style='width: 380px; height: 200px; visibility:hidden; zoom: 1' bgcolor="#ffffdd" cellpadding='0' cellspacing='0' border='0'>
        //|         <tr><td style='width: 380px; height: 200px;'>
        //|             Hey, look at me!<br>
        //|             I'm fading :-)
        //|         </td></tr>
        //|     </table>
        //|     <input type='submit' onClick='fireMyPopup("styled_popup")' value=' Fire! '>
        //| -->
        //|//////////////////////////////////|
        
//////////////////////////////
        //http://psoug.org/snippet/Javascript-Prevent-framing-a-page_114.htm
        function breakout()
        {   if(top.location != location) 
            {   top.location.href = document.location.href ;
            }
        }
        
//////////////////////////////        
        function focusit()
        {   if(document.activeElement)document.activeElement.blur();
        }        