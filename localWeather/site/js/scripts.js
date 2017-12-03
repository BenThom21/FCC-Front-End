// No "script" tags in this file!



//HTML5 Geolocation - Find User Location
$(document).ready(function () {
    var location = document.getElementById("loc");
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            console.log('working');
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }


    function showPosition(position) {
        console.log('showing position');
        var latlong = position.coords.latitude + "," + position.coords.longitude;
        // just in case I want them separate
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(latlong);
        //reverse geocoding using Google API
        var googleGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC64n2_xlIpSInEFKyx3SMLFA4GhmvnSf0";
        console.log(googleGeo);
        $.getJSON(googleGeo, function(data){
            console.log(data);
            $('#city').innerHTML = data.results[0].address_components[2];
        });

        //change inner HTML to results[0].locality, results[0].administrative_area_level_1 <br> results[0].country
        location.innerHTML = "Latitude: " + lat + 
        "<br>Longitude: " + long;
    }


    // geocodeLatLng();
    // function geocodeLatLng(geocoder) {
    //     var geocoder = new google.maps.Geocoder;
    //     var input = document.getElementById('latlng').value;
    //     var latlngStr = input.split(',', 2);
    //     var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    //     geocoder.geocode({'location': latlng}, function(results, status) {
    //       if (status === 'OK') {
    //         if (results[0]) {
    //           document.getElementById('location').innerHTML(results[0].formatted_address);
    //         } else {
    //           alert('No results found');
    //         }
    //       } else {
    //         alert('Geocoder failed due to: ' + status);
    //       }
    //     });
    // }


});

