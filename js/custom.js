$('.grid').masonry({
    // options
    itemSelector: '.module',
    // columnWidth: 200,
    percentPosition: true
  });

(function() {
  var container = document.getElementById( 'container' ),
      trigger = container.querySelector( '.trigger' );
  function toggleContent() {
    if( classie.has( container, 'container--open' ) ) {
      classie.remove( container, 'container--open' );
      classie.remove( trigger, 'trigger--active' );
      $('#portView').text('Open My Portfolio').fadeIn('slow');
      $('.portBtn').removeClass('portClose');
      window.addEventListener( 'scroll', noscroll );
    }
    else {
      classie.add( container, 'container--open' );
      classie.add( trigger, 'trigger--active' );
      $('#portView').text('Close My Portfolio').fadeIn('slow');
      $('.portBtn').addClass('portClose');
      window.removeEventListener( 'scroll', noscroll );
    }
  }
  function noscroll() {
    window.scrollTo( 0, 0 );
  }
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  window.addEventListener( 'scroll', noscroll );
  trigger.addEventListener( 'click', toggleContent );
})();


// Document Ready Start
$(document).ready(function() {  

  $(".fancybox").fancybox();


  // Load Elements on page as I scroll
  (function($) {
    $.fn.visible = function(partial) {
      
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
      
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };
  })(jQuery);


  var win = $(window);
  var allMods = $(".module");
  allMods.each(function(i, el) {
    var el3 = $(el);
    if (el3.visible(true)) {
      el3.addClass("already-visible");
    }
  });


  win.scroll(function(event) {
    allMods.each(function(i, el) {
      var el2 = $(el);
      if (el2.visible(true) && !el2.hasClass("already-visible")) {
        setTimeout(function(){
          el2.addClass("come-in").css("opacity", "1");
        }, 200);
      }
    });
  });


  // Auto Height
  var midSize = $(window).innerHeight();

  $('.midBack').css(
    'height', midSize
  );


  // Contact Form
  var cont = $('.contact-form');
  var close = $('#contClose');
  $('#contact, #mobCont').click(function(){
    $('.overlay').fadeToggle('medium');

    if( cont.hasClass('bounceOutUp') ) {
      cont.removeClass('bounceOutUp').addClass('bounceInDown').css('display', 'block');
    }else if( cont.hasClass('bounceInDown') ){
      cont.removeClass('bounceInDown').addClass('bounceOutUp');
      setTimeout(function(){
        cont.css("display", "none");
      }, 1000);
    }else{
      cont.addClass('bounceInDown').css('display', 'block');
    }
  });


  close.click(function(){
    $('.overlay').fadeToggle('slow');
    if( cont.hasClass('bounceInDown') ){
      cont.removeClass('bounceInDown').addClass('bounceOutUp');
    }
  });
  

  // Ajax Contact Form
  $(function() {

    var form1 = $('#contact1');
    var form2 = $('#contact2');
    var formMessage1 = $('#form-message1');
    var formMessage2 = $('#form-message2');

    $(form1).submit(function(e) {
      e.preventDefault();
      var formData = $(form1).serialize();
      $.ajax({
        type: 'POST',
        url: $(form1).attr('action'),
        data: formData
      })
      .done(function(response) {
        $(formMessage1).removeClass('error');
        $(formMessage1).addClass('success');
        $(formMessage1).text(response);
        $('#cont1Name').val('');
        $('#cont1Email').val('');
        $('#cont1Subject').val('');
        $('#cont1Comments').val('');
      })
      .fail(function(data) {
        $(formMessage1).removeClass('success');
        $(formMessage1).addClass('error');
        if (data.responseText !== '') {
          $(formMessage1).text(data.responseText);
        } else {
          $(formMessage1).text('Oops! An error occured and your message could not be sent.');
        }
      });
    });


    $(form2).submit(function(e) {
      e.preventDefault();
      var formData = $(form2).serialize();
      $.ajax({
        type: 'POST',
        url: $(form2).attr('action'),
        data: formData
      })
      .done(function(response) {
        $(formMessage2).removeClass('error');
        $(formMessage2).addClass('success');
        $(formMessage2).text(response);
        $('#cont2Name').val('');
        $('#cont2Email').val('');
        $('#cont2Subject').val('');
        $('#cont2Comments').val('');
      })
      .fail(function(data) {
        $(formMessage2).removeClass('success');
        $(formMessage2).addClass('error');
        if (data.responseText !== '') {
          $(formMessage2).text(data.responseText);
        } else {
          $(formMessage2).text('Oops! An error occured and your message could not be sent.');
        }
      });
    });


  });

}); // Document Ready End