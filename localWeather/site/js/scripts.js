// No "script" tags in this file!


//HTML5 Geolocation - Find User Location
$(document).ready(function () {
    var location = document.getElementById("loc");
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
        console.log(latlong);
        //reverse geocoding using latlng
        var googleGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC64n2_xlIpSInEFKyx3SMLFA4GhmvnSf0";
        
        location.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude; 
    }
    getLocation();
});