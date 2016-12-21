
var sports = ['Drift', 'Nascar', 'Formula One'];

  
function motorSpotGifs(){
  var mSport= $(this).attr('data-name'); 
  var apiKey = 'api_key=dc6zaTOxFJmzC&limit=10';
  var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + mSport +'&rating=pg-13&' + apiKey;
    //gets the data from the api
    $.ajax({
      url: queryURL,
      method: "GET",
      })
      //waits until the url loads before doing anything 
      .done(function(response) {
       //empties the div berfore populating it with new gifs 
        $('#images').empty();
        //store the data obtained from the API in the results variable 
        var results = response.data;
        
        //looping through the gifs obtained from the API
        for(j=0; j< results.length; j++){
          //creates a new div
           var gifContainer = $('div');
           //stores the ratings of the gifs in the rating variable
           var rating = results[j].rating;
           //stores the link to the still gif
           var still = results[j].images.original_still.url;
           //stores the link to the animated gif
           var animated = results[j].images.original.url;
           //creates and store the img tags and other attributes in the sportsGif variable
           var sportsGif = $('<img>').addClass('thisGif').attr('src', still).attr('data-state', 'still').attr('data-still', still).attr('data-animate', animated);
           //sotres the the ratings and assigns them a proper tag
           var p = $('<p>').text('Rating: ' + rating);
           //gifs and ratings are appended to the corresponding div
           $('#images').append(sportsGif).append(p);
          }
          //event listener that will switch the gifs form still to animate
          //and vise versa everytime on of them is clicked 
        $('.thisGif').on('click', function(){

            var state = $(this).attr('data-state');
            var fastGif = $(this).data('animate');
            var slowGif = $(this).data('still');

            if(state == 'still'){
              $(this).attr('src', fastGif);
              $(this).attr('data-state', 'animate');
            }else if(state == 'animate'){
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
$('.sports').on('click', function(){ 
  //
  motorSpotGifs();
  renderButtons();
  });
//waits for url to load before running any function and or command
$(document).on("click", ".sports", motorSpotGifs);    
  renderButtons();