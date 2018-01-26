
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
                //    var high = Math.round(JSON.stringify(data.daily.data[0].temperatureHigh));
                //    var low = Math.round(JSON.stringify(data.daily.data[0].temperatureLow));
                //    var precip = Math.floor((JSON.stringify(data.daily.data[0].precipProbability)*100));
                   document.getElementById("current").innerHTML = temp;
                //    document.getElementById("high").innerHTML = high;
                //    document.getElementById("low").innerHTML = low;
                //    document.getElementById("precip").innerHTML = precip + "%";
                   //data for forecast as well
                   //day 1
                //    var tmrwHigh = Math.floor(JSON.stringify(data.daily.data[1].temperatureHigh));
                //    var tmrwLow = Math.round(JSON.stringify(data.daily.data[1].temperatureLow));
                //    var tmrwPrecip = Math.floor((JSON.stringify(data.daily.data[1].precipProbability)*100));
                //    document.getElementById("dayOneHigh").innerHTML = tmrwHigh + "&deg;";
                //    document.getElementById("dayOneLow").innerHTML = tmrwLow + "&deg;";
                //    document.getElementById("dayOnePrecip").innerHTML = tmrwPrecip + "%";
                   //day 2
                //    var twoHigh = Math.floor(JSON.stringify(data.daily.data[2].temperatureHigh));
                //    var twoLow = Math.round(JSON.stringify(data.daily.data[2].temperatureLow));
                //    var twoPrecip = Math.floor((JSON.stringify(data.daily.data[2].precipProbability)*100));
                //    document.getElementById("dayTwoHigh").innerHTML = twoHigh + "&deg;";
                //    document.getElementById("dayTwoLow").innerHTML = twoLow + "&deg;";
                //    document.getElementById("dayTwoPrecip").innerHTML = twoPrecip + "%";
                   //day 3
                //    var threeHigh = Math.floor(JSON.stringify(data.daily.data[3].temperatureHigh));
                //    var threeLow = Math.round(JSON.stringify(data.daily.data[3].temperatureLow));
                //    var threePrecip = Math.floor((JSON.stringify(data.daily.data[3].precipProbability)*100));
                //    document.getElementById("dayThreeHigh").innerHTML = threeHigh + "&deg;";
                //    document.getElementById("dayThreeLow").innerHTML = threeLow + "&deg;";
                //    document.getElementById("dayThreePrecip").innerHTML = threePrecip + "%";

                   IconGen(data.currently.icon);
                   ColorChange(Math.round(data.currently.temperature));
                }
            });
            function IconGen(desc) {
                console.log(desc);
                switch (desc) {
                    case "clear-day":
                    $('#icon').addClass('wi wi-day-sunny');
                    break;
                    case "clear-night":
                    $('#icon').addClass('wi wi-night-clear');
                    break;
                    case "partly-cloudy-day":
                    $('#icon').addClass('wi wi-day-cloudy'); 
                    break;
                    case "partly-cloudy-night":
                    $('#icon').addClass('wi wi-night-alt-cloudy'); 
                    break;
                    case "rain":
                    $('#icon').addClass('wi wi-rain'); 
                    break;
                    case "snow":
                    $('#icon').addClass('wi wi-snow'); 
                    break;
                    case "sleet":
                    $('#icon').addClass('wi wi-sleet'); 
                    break;
                    case "wind":
                    $('#icon').addClass('wi wi-strong-wind'); 
                    break;
                    case "cloudy":
                    $('#icon').addClass('wi wi-cloud'); 
                    break;
                    case "fog":
                    $('#icon').addClass('wi wi-fog'); 
                    break;
                    default:
                    "clear-day"; 
                }
            }
            function ColorChange(val) {
                console.log(val + " is this shit");
                // return val;
                if (val <= 32) {
                    $('.container').addClass('cold');
                } else if (val > 32 && val < 55) {
                    $('.container').addClass('cool');
                } else if (val > 55 && val < 80) {
                    $('.container').addClass('warm');
                } else if (val > 80) {
                    $('.container').addClass('hot');
                } else {
                    console.log("whoops, you done messed up!");
                }
            }
        } //end Darsky funciton
        darkSky();
    }
});

//calculating day of week for forecast
// function day() {
//     var day = new Date();
//     var week = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

//     for (i=0; i<14; i++) {
//         var tom = document.getElementById("tomorrow");
//         tom.innerHTML = week[(day.getDay()+1) % 7];
//         var next = document.getElementById("twodays");
//         next.innerHTML = week[(day.getDay()+2) % 7];
//         var two = document.getElementById("threedays");
//         two.innerHTML = week[(day.getDay()+3) % 7]; 
//     }
// }
// day();


//Fahrenheit to Celsius toggle
$(function(){
    $(".toggle").click(function () {
       $(this).text(function(i, text){
           return text === "C°" ? "F°" : "C°";
       })
    });
 });

//TODO: FIGURE THIS OUT!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////
function toggleTemp(val, x) {
    if (x == "F°") {
      return Math.round(val * 1.8 + 32);
    } else {
      return Math.round((val - 32) / 1.8);
    }  
}
function toggleFC(val) {
    if (val == "F°") {
      return "F°";
    }  
    return "C°";
}
$(function() {
      $(".toggle").click(function() {
        var degree = toggleFC($(this).text());
        $(this).text(degree);
        var temp = toggleTemp($("#current").text(), degree);
        $("#current").text(temp);
      });
});

    