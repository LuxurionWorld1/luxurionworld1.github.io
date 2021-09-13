/*!
* Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

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


var GoogleMapsDemo = GoogleMapsDemo || {};

GoogleMapsDemo.Utilities = (function () {
    var _getUserLocation = function (successCallback, failureCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                successCallback(position);
            }, function () {
                failureCallback(true);
            });
         } else {
             failureCallback(false);
         }
    };
    
    return {
        GetUserLocation: _getUserLocation
    }
})();

GoogleMapsDemo.Application = (function () {
    var _geocoder;
    
    var _init = function () {
        _geocoder = new google.maps.Geocoder;
        
        GoogleMapsDemo.Utilities.GetUserLocation(function (position) {
            var latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            _autofillFromUserLocation(latLng);
            _initAutocompletes(latLng);
        }, function (browserHasGeolocation) {
            _initAutocompletes();
        });
    };
    
    var _initAutocompletes = function (latLng) {
        $('.places-autocomplete').each(function () {
            var input = this;
            var isPostalCode = $(input).is('[id$=PostalCode]');
            var autocomplete = new google.maps.places.Autocomplete(input, {
                types: [isPostalCode ? '(regions)' : 'address']
            });
            if (latLng) {
                _setBoundsFromLatLng(autocomplete, latLng);
            }
            
            autocomplete.addListener('place_changed', function () {
                _placeChanged(autocomplete, input);
            });
            
            $(input).on('keydown', function (e) {
                // Prevent form submit when selecting from autocomplete dropdown with enter key
                if (e.keyCode === 13 && $('.pac-container:visible').length > 0) {
                    e.preventDefault();
                }
            });
        });
    }
    
    var _autofillFromUserLocation = function (latLng) {
        _reverseGeocode(latLng, function (result) {
            $('.address').each(function (i, fieldset) {
                _updateAddress({
                    fieldset: fieldset,
                    address_components: result.address_components
                });
            });
        });
    };
    
    var _reverseGeocode = function (latLng, successCallback, failureCallback) {
        _geocoder.geocode({ 'location': latLng }, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    successCallback(results[1]);
                } else {
                    if (failureCallback)
                        failureCallback(status);
                }
            } else {
                if (failureCallback)
                    failureCallback(status);
            }
        });
    }
    
    var _setBoundsFromLatLng = function (autocomplete, latLng) {
        var circle = new google.maps.Circle({
            radius: 40233.6, // 25 mi radius
            center: latLng
        });
        autocomplete.setBounds(circle.getBounds());
    }
    
    var _placeChanged = function (autocomplete, input) {
        var place = autocomplete.getPlace();
        _updateAddress({
            input: input,
            address_components: place.address_components
        });
    }
    
    var _updateAddress = function (args) {
        var $fieldset;
        var isPostalCode = false;
        if (args.input) {
            $fieldset = $(args.input).closest('fieldset');
            isPostalCode = $(args.input).is('[id$=PostalCode]');
            console.log(isPostalCode);
        } else {
            $fieldset = $(args.fieldset);
        }
        
        var $street = $fieldset.find('[id$=Street]');
        var $street2 = $fieldset.find('[id$=Street2]');
        var $postalCode = $fieldset.find('[id$=PostalCode]');
        var $city = $fieldset.find('[id$=City]');
        var $country = $fieldset.find('[id$=Country]');
        var $state = $fieldset.find('[id$=State]');
        
        if (!isPostalCode) {
            $street.val('');
            $street2.val('');
        }
        $postalCode.val('');
        $city.val('');
        $country.val('');
        $state.val('');
        
        var streetNumber = '';
        var route = '';
        
        for (var i = 0; i < args.address_components.length; i++) {
            var component = args.address_components[i];
            var addressType = component.types[0];

            switch (addressType) {
                case 'street_number':
                    streetNumber = component.long_name;
                    break;
                case 'route':
                    route = component.short_name;
                    break;
                case 'locality':
                    $city.val(component.long_name);
                    break;
                case 'administrative_area_level_1':
                    $state.val(component.long_name);
                    break;
                case 'postal_code':
                    $postalCode.val(component.long_name);
                    break;
                case 'country':
                    $country.val(component.long_name);
                    break;
            }
        }
        
        if (route) {
            $street.val(streetNumber && route
                        ? streetNumber + ' ' + route
                        : route);
        }
    }
    
    return {
        Init: _init
    }
})();
GoogleMapsDemo.Application.Init();
