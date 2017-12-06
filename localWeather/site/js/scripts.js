// No "script" tags in this file!



//HTML5 Geolocation - Find User Location
$(document).ready(function() {
    var location = document.getElementById("loc");
    var cityPlace = document.getElementById("city");
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
        // just in case I want them separate
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(latlong);
        //reverse geocoding using Google API
        var googleGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC64n2_xlIpSInEFKyx3SMLFA4GhmvnSf0";
        console.log(googleGeo);
        //FIGURE THIS OUT
        // $.getJSON(googleGeo, function(data){
        //     console.log(data);
        
        //     var hood = data.results[0].address_components[2].short_name;
        //     console.log(hood);
        //     var city = data.results[0].address_components[3].short_name;
        //     console.log(city);
        //     var state = data.results[0].address_components[5].short_name;
        //     console.log(state);
        //     var country = data.results[0].address_components[6].short_name;
        //     console.log(country);

        //     //test area
        //     var cityName = document.getElementById("city");
        //     cityName.innerHTML = city;
        //     // document.getElementById("city").innerHTML = city;
        // });

        $.ajax({
            type: 'GET',
            url: googleGeo,
            dataType: 'json',
            async: false,
            success: function(data) {
                console.log("here: " + data);

                var hood = data.results[0].address_components[2].short_name;
                console.log(hood);
                var city = data.results[0].address_components[3].short_name;
                console.log(city);
                var state = data.results[0].address_components[5].short_name;
                console.log(state);
                var country = data.results[0].address_components[6].short_name;
                console.log(country);


                // document.getElementById("city").innerHTML = city;
                cityPlace.innerHTML = "this: " + city;
                console.log(cityPlace);
            }

        });


    }





});

