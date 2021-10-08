
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

})()




// Initialize Firebase
var config = {
  apiKey: "AIzaSyD9YEmbXyoQFCpcd_xtx3yCErvHQqzxxZQ",
  authDomain: "lehenga-size-chart-45541.firebaseapp.com",
  databaseURL: "https://lehenga-size-chart-45541-default-rtdb.firebaseio.com",
  projectId: "lehenga-size-chart-45541",
  storageBucket: "lehenga-size-chart-45541.appspot.com",
  messagingSenderId: "1067458518244"
};
firebase.initializeApp(config);
// Reference messages collection
var messagesRef = firebase.database().ref('messages');



  // Firebase code starts from here
var e = document.getElementById("sizeChart").addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
// get vlaues 

  var sizeUnit = getInputVal('sizeUnit');
  var email = getInputVal('email');
  var title = getInputVal('title');
  var shoulder = getInputVal('shoulder');
  var shoulderFullLength = getInputVal('shoulderFL');
  var frontNeckDepth = getInputVal('frontNeckDepth');
  var chestAround = getInputVal('chestAround');
  var waistAround = getInputVal('waistAround');
  var backNeckDepth = getInputVal('backNeckDepth');
  var blouseLength = getInputVal('blouseLength');
  var sleeveLength = getInputVal('sleeveLength');
  var sleeveAround = getInputVal('sleeveAround');
  var armhole = getInputVal('armhole');
  var chooseOne = getInputVal('padding');
  var blouseOpening = getInputVal('blouseOpening');
  var comment = getInputVal('comment');
  var lehengaLength = getInputVal('lehengaLength');
  var lehengaWaist = getInputVal('lehengaWaist');
  var lehengaHips = getInputVal('lehengaHips');



 


    // for current date and time


    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();


// save message 

saveMessage(sizeUnit,title,shoulder,shoulderFullLength,frontNeckDepth,chestAround,email,waistAround, backNeckDepth,blouseLength,sleeveAround,sleeveLength,armhole,chooseOne,blouseOpening,comment,datetime,lehengaLength,lehengaWaist,lehengaHips
  );

// show alert

document.getElementById("alert").style.display = 'block';
document.getElementById("alert").style.backgroundColor ="#00FF00";


// Hide alert after 3 seconds 
setTimeout(function(){
  document.getElementById("alert").style.display = 'none';
},3000);

// Clear form
document.getElementById('sizeChart').reset();


// function to get form values

function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(sizeUnit,title,shoulder,shoulderFullLength,frontNeckDepth,chestAround,email,waistAround, backNeckDepth,blouseLength,sleeveAround,sleeveLength,armhole,chooseOne,blouseOpening,comment,datetime, lehengaWaist,lehengaLength,lehengaHips){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    datetime:datetime,
    sizeUnit:sizeUnit,
    title:title,
    shoulder:shoulder,
    shoulderFullLength:shoulderFullLength,
    frontNeckDepth:frontNeckDepth,
    chestAround:chestAround,
    email:email,
    waistAround: waistAround, 
    backNeckDepth: backNeckDepth,
    blouseLength: blouseLength,
    sleeveAround: sleeveAround,
    sleeveLength: sleeveLength,
    armhole: armhole,
    chooseOne: chooseOne,
    blouseOpening: blouseOpening,
    comment:comment,
    lehengaHips:lehengaHips,
    lehengaLength:lehengaLength,
    lehengaWaist: lehengaWaist
  });
}}

//Hide blouse measurement if already filled for saree product

  $(function () {
    $(".chkfilled").click(function () {
        if ($(this).is(":checked")) {
            $(".blouse").hide();
        } else {
            $(".blouse").show();
        }
    });
});