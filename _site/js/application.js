$(document).ready(function(){

  var projectFilters = {
    resetProjects: function(){
      $('#projects-filters').find('.project-title').html('Tous les projets');
    },
    resetTypes: function(){
      $('#projects-filters').find('.type-li').removeClass('active');
      $('#projects-filters').find('.type-li:first-child').addClass('active');
    }
  }

  var $container = $('#projects-container').imagesLoaded( function() {
    $('.project img').css('width', '100%');
    $container.isotope({
      itemSelector: '.project'
    });

    $('#projects-loading').remove();
    $('.project').hover(function() {
      var $imgDesc = $(this).find('.img-desc'),
          $h2 = $imgDesc.find('h2'),
          marginTop = ($imgDesc.height() / 2 - 18);

      $h2.css('margin-top', marginTop+'px');
      $h2.html($(this).prop('title'))
      $imgDesc.fadeIn(300);
    }, function() {
      $(this).find('.img-desc').fadeOut(300);
    });

    $('.project:visible').colorbox({
      width: '90%',
      height: '90%',
      photo: true,
      maxWidth:'1280px',
      maxHeight:'1024px',
      previous: '',
      next: '',
      current: '',
      close: ''
    });

    $container.isotope( 'on', 'layoutComplete', function( isoInstance, laidOutItems ) {
      $.colorbox.remove();
      $('.project:visible').colorbox({
        width: '90%',
        height: '90%',
        maxWidth:'1280px',
        maxHeight:'1024px',
        photo: true,
        previous: '',
        next: '',
        current: '',
        close: ''
      });

    });
  });


  $('.dropdown-menu').on('click', 'a', function(e){
    e.preventDefault();
    var $dropdown = $(this).parents('.dropdown-menu'),
        text = $(this).text();

    $dropdown.prev().find('.project-title').html(text);
    projectFilters.resetTypes();
    $container.isotope({ filter: $(this).data('filter') });
  });

  $('#projects-filters a.type-filter').on('click', function(e){
    e.preventDefault();
    $(this).parents('ul').find('li').removeClass('active');
    $(this).parents('li').addClass('active');
    projectFilters.resetProjects();
    $container.isotope({ filter: $(this).data('filter')  });
  });

});
