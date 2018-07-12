 $('document').ready(function() {
    $('.burger').click(function() {
      $('.main-menu').toggle();
  });
    $(window).resize(function() {		
		  if ($(window).width() > 600 ) {			
			  $('.main-menu').removeAttr('style');
		 }
	});
   if ($(window).width() < 600 ) {
        $('.reasons-parent').click(function() {
          $('.reasons').toggle();
      });
      $('.vpn-menu-parent').click(function() {
        $('.vpn-menu').toggle();
      });
		}
});