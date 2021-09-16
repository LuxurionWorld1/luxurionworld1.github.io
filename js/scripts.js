/*!
* Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
   

   

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// Map Auto fill JS code

function is_int(value) {
    if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }
  
  $(".fancy-form div > div").hide();
  
  $("#zip").keyup(function() {
  
    // Cache
    var el = $(this);
  
    // Did they type five integers?
    if ((el.val().length == 6) && (is_int(el.val()))) {
  
      // Call Ziptastic for information
      $.ajax({
        url: "https://zip.getziptastic.com/v2/IN/" + el.val(),
        cache: false,
        dataType: "json",
        type: "GET",
        success: function(result, success) {
  
          $(".zip-error, .instructions").slideUp(200);
  
          $("#city").val(result.city);
  
          $("#state").val(result.state);
  
          $(".fancy-form div > div").slideDown();
  
          $("#zip").blur();
          $("#address-line-1").show().focus();
  
        },
        error: function(result, success) {
  
          $(".zip-error").slideDown(300);
  
        }
  
      });
  
    } else if (el.val().length < 6) {
  
      $(".zip-error").slideUp(200);
  
    };
  
  });