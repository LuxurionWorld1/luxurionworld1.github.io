/*!
* Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/

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
  var street1 = getInputVal('addressLine');
  var street2 = getInputVal('address-line-2');
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
  //var categoryAndArtform = document.querySelector('.flexCheckChecked:checked').value;



// save message 

saveMessage(first,last,company,vendorCode,phone,AlternatePhone,email,zip, addressLine,street2,city,state,aadharNumber,panCard,gstNumber,bankAccountNumber,bankAddress,bankName,bankBranch,IFSC,swiftCode,categoryAndArtform);

// show alert

document.querySelector('.alert').style.display = 'block';

// Hide alert after 3 seconds 
setTimeout(function(){
  document.querySelector('.alert').style.display = 'none';
},3000);

// Clear form
document.getElementById('vendorForm').reset();


// function to get form values

function getInputVal(id){
  //return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstName,lastName,company,vendorCode,phone,AlternatePhone,email,zip,street1,street2,city,state,aadharNumber,panCard,gstNumber,bankAccountNumber,bankAddress,bankName,bankBranch,IFSC,swiftCode,categoryAndArtform){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    first:firstName,
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
    categoryAndArtform:categoryAndArtform
  });
}}
