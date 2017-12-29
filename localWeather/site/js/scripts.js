// No "script" tags in this file!


//HTML5 Geolocation - Find User Location
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
    var latlong = '';
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
                console.log(data);
                //This changed big time when I was home, check which #s in array are uiversal
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

        // Getting weather with DarkSky API
        // I have learned that $.getJSON causes cors error - that's why it's jsonp + stringify
        function darkSky() {
            var url = ("https://api.darksky.net/forecast/236c175f398e2795371f80cad4375102/" + latlong);
            $.ajax({
               url: url,
               dataType: "jsonp",
               success: function(data) {
                   console.log("DarkSky working!:)");
                   console.log(data);
                   //math.round puts temperature at the nearest whole number
                   //I could cut a LOT of this down with jQuery...
                   var temp = Math.round(JSON.stringify(data.currently.temperature));
                   var high = Math.round(JSON.stringify(data.daily.data[0].temperatureHigh));
                   var low = Math.round(JSON.stringify(data.daily.data[0].temperatureLow));
                   var precip = Math.floor((JSON.stringify(data.daily.data[0].precipProbability)*100));
                   document.getElementById("current").innerHTML = temp;
                   document.getElementById("high").innerHTML = high;
                   document.getElementById("low").innerHTML = low;
                   document.getElementById("precip").innerHTML = precip + "%";
                   //data for forecast as well
                   //day 1
                   var tmrwHigh = Math.floor(JSON.stringify(data.daily.data[1].temperatureHigh));
                   var tmrwLow = Math.round(JSON.stringify(data.daily.data[1].temperatureLow));
                   var tmrwPrecip = Math.floor((JSON.stringify(data.daily.data[1].precipProbability)*100));
                   document.getElementById("dayOneHigh").innerHTML = tmrwHigh;
                   document.getElementById("dayOneLow").innerHTML = tmrwLow;
                   document.getElementById("dayOnePrecip").innerHTML = tmrwPrecip + "%";
                   //day 2
                   var twoHigh = Math.floor(JSON.stringify(data.daily.data[2].temperatureHigh));
                   var twoLow = Math.round(JSON.stringify(data.daily.data[2].temperatureLow));
                   var twoPrecip = Math.floor((JSON.stringify(data.daily.data[2].precipProbability)*100));
                   document.getElementById("dayTwoHigh").innerHTML = twoHigh;
                   document.getElementById("dayTwoLow").innerHTML = twoLow;
                   document.getElementById("dayTwoPrecip").innerHTML = twoPrecip + "%";
                   //day 3
                   var threeHigh = Math.floor(JSON.stringify(data.daily.data[3].temperatureHigh));
                   var threeLow = Math.round(JSON.stringify(data.daily.data[3].temperatureLow));
                   var threePrecip = Math.floor((JSON.stringify(data.daily.data[3].precipProbability)*100));
                   document.getElementById("dayThreeHigh").innerHTML = threeHigh;
                   document.getElementById("dayThreeLow").innerHTML = threeLow;
                   document.getElementById("dayThreePrecip").innerHTML = threePrecip + "%";

                   IconGen(data.currently.icon);
                }
            });
            function IconGen(desc) {
                console.log("pulled it out");
                var skycons = new Skycons({"color": "orange"});
                switch (RTCSessionDescription) {
                        case "clear-day":
                        skycons.add("icon", Skycons.CLEAR_DAY); 
                        break;
                        case "clear-night":
                        skycons.add("icon", Skycons.CLEAR_NIGHT);
                        break;
                        case "partly-cloudy-day":
                        skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
                        break;
                        case "partly-cloudy-night":
                        skycons.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
                        break;
                        case "cloudy":
                        skycons.add("icon", Skycons.CLOUDY);
                        break;
                        case "rain":
                        skycons.add("icon", Skycons.RAIN);
                        break;
                        case "sleet":
                        skycons.add("icon", Skycons.SLEET);
                        break;
                        case "snow":
                        skycons.add("icon", Skycons.SNOW);
                        break;
                        case "wind":
                        skycons.add("icon", Skycons.WIND);
                        break;
                        case "fog":
                        skycons.add("icon", Skycons.FOG);
                        break;
                        default:
                        "clear-day";
                    }
                skycons.play();
            }
        } //end Darsky funciton
        darkSky();
    }
});


//calculating day of week for forecast
function day() {
    var day = new Date();
    var week = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

    for (i=0; i<14; i++) {
        var tom = document.getElementById("tomorrow");
        tom.innerHTML = week[(day.getDay()+1) % 7];
        var next = document.getElementById("twodays");
        next.innerHTML = week[(day.getDay()+2) % 7];
        var two = document.getElementById("threedays");
        two.innerHTML = week[(day.getDay()+3) % 7]; 
    }
}
day();



                    // var skycons = new Skycons({"color": "orange"});
                    // switch (currentIcon) {
                    //       case "clear-day":
                    //         skycons.add("icon", Skycons.CLEAR_DAY); 
                    //         break;
                    //       case "clear-night":
                    //         skycons.add("icon", Skycons.CLEAR_NIGHT);
                    //         break;
                    //       case "partly-cloudy-day":
                    //         skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
                    //         break;
                    //       case "partly-cloudy-night":
                    //         skycons.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
                    //         break;
                    //       case "cloudy":
                    //         skycons.add("icon", Skycons.CLOUDY);
                    //         break;
                    //       case "rain":
                    //         skycons.add("icon", Skycons.RAIN);
                    //         break;
                    //       case "sleet":
                    //         skycons.add("icon", Skycons.SLEET);
                    //         break;
                    //       case "snow":
                    //         skycons.add("icon", Skycons.SNOW);
                    //         break;
                    //       case "wind":
                    //         skycons.add("icon", Skycons.WIND);
                    //         break;
                    //       case "fog":
                    //         skycons.add("icon", Skycons.FOG);
                    //         break;
                    //         default:
                    //         "clear-day";
                    //     }
                    // skycons.play();


//Skycons for DarkSky API
// function weatherIcon (weatherType) {
//     console.log(weatherType);
//     var skycon = new Skycons({"color": "orange"});
    
//     switch (weatherType) {
//       case "clear-day":
//         skycon.add("icon", Skycons.CLEAR_DAY); 
//         break;
//       case "clear-night":
//         skycon.add("icon", Skycons.CLEAR_NIGHT);
//         break;
//       case "partly-cloudy-day":
//         skycon.add("icon", Skycons.PARTLY_CLOUDY_DAY);
//         break;
//       case "partly-cloudy-night":
//         skycon.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
//         break;
//       case "cloudy":
//         skycon.add("icon", Skycons.CLOUDY);
//         break;
//       case "rain":
//         skycon.add("icon", Skycons.RAIN);
//         break;
//       case "sleet":
//         skycon.add("icon", Skycons.SLEET);
//         break;
//       case "snow":
//         skycon.add("icon", Skycons.SNOW);
//         break;
//       case "wind":
//         skycon.add("icon", Skycons.WIND);
//         break;
//       case "fog":
//         skycon.add("icon", Skycons.FOG);
//         break;
//     }
//     skycon.play();
//   }
//   weatherIcon();