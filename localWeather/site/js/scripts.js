// No "script" tags in this file!

var x = document.getElementById('loc');
function getUserInfo () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//HTML5 Geolocation
$(document).ready(function () {
    var x = document.getElementById("loc");
    function getLocation() {
        if (navigator.geolocation) {
            console.log('yup');
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log('nope');
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        console.log('showing position');
        x.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude; 
    }
});