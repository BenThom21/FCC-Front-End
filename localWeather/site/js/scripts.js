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
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(latlong);
        //reverse geocoding using Google API
        var googleGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC64n2_xlIpSInEFKyx3SMLFA4GhmvnSf0";
        
        //change innter HTML to neighborhood, state <br> country
        location.innerHTML = "Latitude: " + lat + 
        "<br>Longitude: " + long; 
    }
});