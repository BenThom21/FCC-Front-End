$(document).ready(function() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: false,
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        }
        error: function (errorMessage) {
        }

    })
})