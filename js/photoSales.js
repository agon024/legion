$(document).ready(function() {

  if( $('#donate').length ) {
   setTimeout(function(){
      $('#donate').addClass('bounceIn').css({ opacity: '1' });
    }, 500);
  }

  if( $('#donate2').length ) {
   setTimeout(function(){
      $('#donate2').addClass('bounceIn').css({ opacity: '1' });
    }, 1500);
  }

}); // End Document Ready