/**
* Template Name: Dewi - v4.5.0
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {

    let portfolioContainer = select('.portfolio-container');

    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()




// Initialize Firebase
var config = {
  apiKey: "AIzaSyBCYuxugiG_aMUkqkYXvQ3kmfJAeOdZYXI",
  authDomain: "vendor-form-48fd1.firebaseapp.com",
  databaseURL: "https://vendor-form-48fd1-default-rtdb.firebaseio.com/",
  projectId: "vendor-form-48fd1",
  storageBucket: "vendor-form-48fd1.appspot.com",
  messagingSenderId: "G-KM8BYNSHEY"
};
firebase.initializeApp(config);
// Reference messages collection
var messagesRef = firebase.database().ref('messages');

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

  // Firebase code starts from here
var e = document.getElementById("vendorForm").addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
// get vlaues 

  var firstName = getInputVal('first');
  var lastName = getInputVal('last');
  var company = getInputVal('company');
  var vendorCode = getInputVal('vendorCode');
  var phone = getInputVal('phone');
  var AlternatePhone = getInputVal('AlternatePhone');
  var email = getInputVal('email');
  var zip = getInputVal('zip');
  var street1 = getInputVal('street1');
  var street2 = getInputVal('street2');
  var city = getInputVal('city');
  var state = getInputVal('state');
  var aadharNumber = getInputVal('aadhar-no');
  var panCard = getInputVal('PanCard');
  var gstNumber = getInputVal('gst');
  var bankAccountNumber = getInputVal('bankac');
  var bankName = getInputVal('bname');
  var bankBranch = getInputVal('bbranch');
  var bankAddress = getInputVal('baddress');
  var IFSC = getInputVal('ifsc');
  var swiftCode = getInputVal('swift');


  // saving checkbox values in an array 

  var categories = new Array();
  var category = document.querySelectorAll('[id^=catflexCheckChecked]');
  for (var i = 0; i < category.length; ++i) {
    var input1 = category[i];
    if (input1.checked == true) {
      categories += input1.value;
      categories += ",";
      }
    }
    categories = categories.slice(0,-1); 


    var artforms = new Array();
    var artform = document.querySelectorAll('[id^=artflexCheckChecked]');
    for (var i = 0; i < artform.length; ++i) {
      var input = artform[i];
      if (input.checked == true) {
        artforms += input.value;
        artforms += ",";
      }
    }
    artforms = artforms.slice(0,-1); 



    // for current date and time


    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();


// save message 

saveMessage(firstName,lastName,company,vendorCode,phone,AlternatePhone,email,zip, street1,street2,city,state,aadharNumber,panCard,gstNumber,bankAccountNumber,bankAddress,bankName,bankBranch,IFSC,swiftCode,categories,artforms,datetime
  );

// show alert

document.getElementById("alert").style.display = 'block';
document.getElementById("alert").style.backgroundColor ="#00FF00";


// Hide alert after 3 seconds 
setTimeout(function(){
  document.getElementById("alert").style.display = 'none';
},3000);

// Clear form
document.getElementById('vendorForm').reset();


// function to get form values

function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstName,lastName,company,vendorCode,phone,AlternatePhone,email,zip,street1,street2,city,state,aadharNumber,panCard,gstNumber,bankAccountNumber,bankAddress,bankName,bankBranch,IFSC,swiftCode, categories,artforms,datetime){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    datetime:datetime,
    firstName:firstName,
    lastName: lastName,
    company:company,
    vendorCode:vendorCode,
    phone:phone,
    AlternatePhone:AlternatePhone,
    email:email,
    zip:zip,
    street1:street1,
    street2:street2,
    city:city,
    state:state,
    aadharNumber:aadharNumber,
    panCard:panCard,
    gstNumber:gstNumber,
    bankAccountNumber:bankAccountNumber,
    bankAddress:bankAddress,
    bankName:bankName,
    bankBranch:bankBranch,
    IFSC:IFSC,
    swiftCode:swiftCode,
    categories:categories,
    artforms: artforms
  });
}}

