
$('.start-link').on("click", function(event) {

  $('html, body').animate({

    scrollTop: $($(this).attr("href")).offset().top

  }, 500);

  event.preventDefault();

});
