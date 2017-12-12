// No "script" tags in this file!


//HTML5 Geolocation - Find User Location
var latlong = '';
$(document).ready(function() {
    var location = document.getElementById("loc");
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            console.log('geo working');
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            location.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    
    function showPosition(position) {
        console.log('showing position');
        var latlong = position.coords.latitude + "," + position.coords.longitude;
        //reverse geocoding using Google API (get your own API key)
        var googleGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC64n2_xlIpSInEFKyx3SMLFA4GhmvnSf0";
        console.log(googleGeo);
        // accessing the api data 
        $.ajax({
            type: 'GET',
            url: googleGeo,
            dataType: 'json',
            async: false,
            success: function(data) {
                var hood = data.results[0].address_components[2].short_name;
                var city = data.results[0].address_components[3].short_name;
                var state = data.results[0].address_components[5].short_name;
                var country = data.results[0].address_components[6].short_name;
                //now placing the data in spans with IDs
                document.getElementById("hood").innerHTML = hood;
                document.getElementById("city").innerHTML = city;
                document.getElementById("country").innerHTML = country;
            }
        });
    }
});
// END GEOLOCATION

// Getting weather with DarkSky API
darkSky();
function darkSky() {
    var url = ("https://api.darksky.net/forecast/236c175f398e2795371f80cad4375102/" + latlong);
    $.getJSON(url, function(forecast) {
        console.log(forecast);
    });
    console.log(url);
}




