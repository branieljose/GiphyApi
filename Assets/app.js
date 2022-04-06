
var sports = ['Drift', 'Nascar', 'Formula One'];
var config = "/config.js/";


function motorSpotGifs() {
    var mSport = $(this).attr('data-name');
    var apiKey = config.SECRET_API_KEY;
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mSport + '&rating=pg-13&api_key=' + apiKey;
    $.ajax({
            url: queryURL,
            method: "GET",
        })
        .done(function(response) {
            
            $('#images').empty();
            var results = response.data;
            for (j = 0; j < results.length; j++) {
                //creates a new div
                var gifContainer = $('div');
                var rating = results[j].rating;
                var still = results[j].images.original_still.url;
                var animated = results[j].images.original.url;
                var sportsGif = $('<img>').addClass('thisGif').attr('src', still).attr('data-state', 'still').attr('data-still', still).attr('data-animate', animated);
                var p = $('<p>').text('Rating: ' + rating);
                $('#images').append(sportsGif).append(p);
            }

            $('.thisGif').on('click', function() {

                var state = $(this).attr('data-state');
                var fastGif = $(this).data('animate');
                var slowGif = $(this).data('still');

                if (state == 'still') {
                    $(this).attr('src', fastGif);
                    $(this).attr('data-state', 'animate');
                } else if (state == 'animate') {
                    $(this).attr('src', slowGif);
                    $(this).attr('data-state', 'still');
                }
            });
        });

}

function renderButtons() {
    for (var i = 0; i < sports.length; i++) {
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("sports");
        // Added a data-attribute
        a.attr("data-name", sports[i]);
        // Provided the initial button text
        a.text(sports[i]);
        // Added the button to the buttons-view div
        $("#buttons").append(a);
    }
}
$("#add-button").on("click", function(event) {
    //prevents the page from refreshing everytime a new button is added
    event.preventDefault();
    // Deletes the movies prior to adding new movies
    $("#buttons").empty();
    // This line of code will grab the input from the textbox
    var movie = $("#user-input").val().trim();

    // The movie from the textbox is then added to our array
    sports.push(movie);
    $('#user-input').val('');
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
$('.sports').on('click', function() {
    //
    motorSpotGifs();
    renderButtons();
});
//waits for url to load before running any function and or command
$(document).on("click", ".sports", motorSpotGifs);
renderButtons();