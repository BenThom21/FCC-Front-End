$(document).ready(function() {
    var searchTerm = $('#search').val();
    var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?",'
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: false,
        //Need to change this URL once I figure out how to cut in the search
        url: url;
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        },
        error: function (errorMessage) {
        }

    });
})