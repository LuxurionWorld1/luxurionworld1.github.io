
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
  apiKey: "AIzaSyCVlSxusHfWkTaAn2Je0zpdJNVAFGmQhxs",
  authDomain: "suit-and-kurti-size-char-28976.firebaseapp.com",
  databaseURL: "https://suit-and-kurti-size-char-28976-default-rtdb.firebaseio.com",
  projectId: "suit-and-kurti-size-char-28976",
  storageBucket: "suit-and-kurti-size-char-28976.appspot.com",
  messagingSenderId: "1012226878106"
};
firebase.initializeApp(config);
// Reference messages collection
var messagesRef = firebase.database().ref('messages');



  // Firebase code starts from here
var e = document.getElementById("vendorForm").addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
// get vlaues 

  var sizeUnit = getInputVal('sizeUnit');
  var email = getInputVal('email');
  var title = getInputVal('title');
  var length = getInputVal('length');
  var upperChest = getInputVal('upperChest');
  var chest = getInputVal('chest');
  var aboveNavel = getInputVal('aboveNavel');
  var shoulder = getInputVal('shoulder');
  var frontNeck = getInputVal('frontNeck');
  var backNeck = getInputVal('backNeck');
  var sleeveLength = getInputVal('sleeveLength');
  var sleeveAround = getInputVal('sleeveAround');
  var armhole = getInputVal('armhole');
  var hip = getInputVal('hip');
  var waist = getInputVal('waist');
  var waistToAnkle = getInputVal('waistToAnkle');
  var thighs = getInputVal("thighs");
  var knee = getInputVal("knee");
  var calf = getInputVal("calf");
  var ankle = getInputVal("ankle");
  var bottomType = getInputVal("bottomType");
  var comment = getInputVal("comment")


 


    // for current date and time


    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();


// save message 

saveMessage(sizeUnit, email, title, length, upperChest, chest, aboveNavel, shoulder, frontNeck, backNeck, sleeveLength, sleeveAround, armhole, hip, waist, waistToAnkle, thighs, knee, calf, ankle, bottomType, comment,datetime
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
function saveMessage(sizeUnit, email, title, length, upperChest, chest, aboveNavel, shoulder, frontNeck, backNeck, sleeveLength, sleeveAround, armhole, hip, waist, waistToAnkle, thighs, knee, calf, ankle, bottomType, comment,datetime){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
  sizeUnit: sizeUnit,
  email: email,
  title: title,
  length: length,
  upperChest: upperChest,
  chest: chest,
  aboveNavel: aboveNavel,
  shoulder: shoulder,
  frontNeck: frontNeck,
  backNeck: backNeck,
  sleeveLength: sleeveLength,
  sleeveAround: sleeveAround,
  armhole: armhole,
  hip: hip,
  waist: waist,
  waistToAnkle: waistToAnkle,
  thighs: thighs,
  knee: knee,
  calf: calf,
  ankle: ankle, 
  bottomType: bottomType, 
  comment: comment,
  datetime:datetime
  });
}}

