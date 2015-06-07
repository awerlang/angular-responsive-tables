/// <reference path="../typings/jquery/jquery.d.ts"/>
jQuery.expr.filters.offscreen = function(el) {
  //console.log('el(' + el.textContent + '): (' + el.offsetLeft + ' x ' + el.offsetTop + ') -> (' + (el.offsetLeft+el.offsetWidth) + ' x ' + (el.offsetTop+el.offsetHeight) + ')');
  return (
              (el.offsetLeft + el.offsetWidth) < 0 
              || (el.offsetTop + el.offsetHeight) < 0
              || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
         );
};