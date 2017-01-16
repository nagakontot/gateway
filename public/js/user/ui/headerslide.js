 "use strict";
 
        (function($) 
        {   "use strict";
            jQuery.fn.fadeSlideToggle = function(options, fn) 
            {   var defaults = $.extend({ "dimension": "height","duration": jQuery.fx.speeds._default}, options);
                
                return this.each(function(index, value) 
                {    $(value).stop().animate( { "opacity":    "toggle",
                                                "height":     "toggle"        // TODO Find a way to allow the user to pass a dimension option, like "width" or "height".
                                              }, 
                                              defaults.duration, 
                                              function() 
                                              {    jQuery.isFunction(fn) && fn.call(this);
                                              });
                });
            };
        }(jQuery));        
        
        jQuery(document).ready(function() 
        {   var jQbox = jQuery(".box"),
            jQstartButton = jQuery(".start");
  
            jQstartButton.on("click", function() 
            {    jQbox.fadeSlideToggle({"duration": 500}, function() {});
            });
        });

/*
//call it in onready:
//jQuery(".box").fadeSlideToggle({"duration": 500}, function() {});

//css
.box 
{ opacity:            1;
  height:             200px;
  width:              100%;
  background-image:   url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjEuMCIgeDI9IjEuMCIgeTI9IjAuMCI+PHN0b3Agb2Zmc2V0PSI5JSIgc3RvcC1jb2xvcj0iI2IxNDVjNyIvPjxzdG9wIG9mZnNldD0iOSUiIHN0b3AtY29sb3I9IiM3NjQ2ZDYiLz48c3RvcCBvZmZzZXQ9IjE4JSIgc3RvcC1jb2xvcj0iIzc2NDZkNiIvPjxzdG9wIG9mZnNldD0iMTglIiBzdG9wLWNvbG9yPSIjNGE1YWRiIi8+PHN0b3Agb2Zmc2V0PSIyNyUiIHN0b3AtY29sb3I9IiM0YTVhZGIiLz48c3RvcCBvZmZzZXQ9IjI3JSIgc3RvcC1jb2xvcj0iIzRhNzhlNCIvPjxzdG9wIG9mZnNldD0iMzYlIiBzdG9wLWNvbG9yPSIjNGE3OGU0Ii8+PHN0b3Agb2Zmc2V0PSIzNiUiIHN0b3AtY29sb3I9IiMzYTlkY2YiLz48c3RvcCBvZmZzZXQ9IjQ1JSIgc3RvcC1jb2xvcj0iIzNhOWRjZiIvPjxzdG9wIG9mZnNldD0iNDUlIiBzdG9wLWNvbG9yPSIjMzhiZjczIi8+PHN0b3Agb2Zmc2V0PSI1NCUiIHN0b3AtY29sb3I9IiMzOGJmNzMiLz48c3RvcCBvZmZzZXQ9IjU0JSIgc3RvcC1jb2xvcj0iIzgwYzgzYiIvPjxzdG9wIG9mZnNldD0iNjMlIiBzdG9wLWNvbG9yPSIjODBjODNiIi8+PHN0b3Agb2Zmc2V0PSI2MyUiIHN0b3AtY29sb3I9IiNjYWQ4MzkiLz48c3RvcCBvZmZzZXQ9IjcyJSIgc3RvcC1jb2xvcj0iI2NhZDgzOSIvPjxzdG9wIG9mZnNldD0iNzIlIiBzdG9wLWNvbG9yPSIjZTdiYTM3Ii8+PHN0b3Agb2Zmc2V0PSI4MSUiIHN0b3AtY29sb3I9IiNlN2JhMzciLz48c3RvcCBvZmZzZXQ9IjgxJSIgc3RvcC1jb2xvcj0iI2U3NzMzNyIvPjxzdG9wIG9mZnNldD0iOTAlIiBzdG9wLWNvbG9yPSIjZTc3MzM3Ii8+PHN0b3Agb2Zmc2V0PSI5MCUiIHN0b3AtY29sb3I9IiNlOTQxMWYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlOTQxMWYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNiMTQ1YzciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjwvc3ZnPiA=');
  background-size:    100%;
  background-image:   linear-gradient(45deg, #b145c7 9%, #7646d6 9%, #7646d6 18%, #4a5adb 18%, #4a5adb 27%, #4a78e4 27%, #4a78e4 36%, #3a9dcf 36%, #3a9dcf 45%, #38bf73 45%, #38bf73 54%, #80c83b 54%, #80c83b 63%, #cad839 63%, #cad839 72%, #e7ba37 72%, #e7ba37 81%, #e77337 81%, #e77337 90%, #e9411f 90%, #e9411f 100%, #b145c7 100%);
  border-radius:      5px;
}

//html
    <div class="box">
        <div action="" class="m-rocker">
          <input id="switch1" type="checkbox"><label for="switch1">Switch1</label>
          <input id="switch2" type="checkbox"><label for="switch2">Switch2</label>
          <input id="switch3" type="checkbox"><label for="switch3">Switch3</label>
          <input id="switch4" type="checkbox"><label for="switch4">Switch4</label>
          <input id="switch5" type="checkbox"><label for="switch5">Switch5</label>
          <input id="switch6" type="checkbox"><label for="switch6">Switch6</label>
          <input id="switch7" type="checkbox"><label for="switch7">Switch7</label>
          <input id="switch8" type="checkbox"><label for="switch8">Switch8</label>
        </div>
    </div>
*/