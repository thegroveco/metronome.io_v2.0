$( document ).ready(function($) {

	var navbar = $('.navbar');
	var origOffsetY = navbar.offset().top;

	function scroll() {

		if ( $(window).scrollTop() >= origOffsetY ) {
			$("header#masthead").addClass("scrolled fixed-top");
			$('body').css('padding-top', '110px');
		} else {
		    $("header#masthead").removeClass("scrolled fixed-top");
		    $('body').css('padding-top', '0');
		}

	}

	document.onscroll = scroll;

	$('.toggler').on('click', function() {
		$(this).toggleClass('is-active');
	})

});