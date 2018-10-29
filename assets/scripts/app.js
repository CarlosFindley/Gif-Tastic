// Begin jQuery
$(document).ready(function() {

// array of topics
var topics = [
    "Parks and Rec",
    "Croc Cuca",
    "The Simpsons",
    "Aubrey Plaza",
    "Grumpy Cat",
    "Twilight Zone",
    "Joanne the Scammer",
    "Doge",
    "Pride",
    "Technology"
];

// -------------------------------------------------------------------------------------
// Function for displaying gif topics data
function renderButtons() {

    // Deleting the gif topics buttons prior to adding new gif buttons
    // (this is necessary otherwise we will have repeat buttons)
    $(".topicButtons").empty();

    // Looping through the array of gif topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each gif in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("gifButton");
      // Adding a data-attribute with a value of the gif topics at index i
      a.attr("data-newGifsData", topics[i]);
      // Providing the button's text with a value of the gif topics at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $(".topicButtons").append(a);
    }
  }

  // This function handles events where one button is clicked
  $(".submitButton").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var gifInputBox = $(".searchBar").val().trim();
    // The gif from the textbox is then added to our array
    topics.push(gifInputBox);

    // calling renderButtons which handles the processing of our gif topics array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of gifs
  renderButtons();
  // -------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------
  // Adding click event listen listener to all buttons
  $(document).on("click",".gifButton", function() {

    console.log("CLICK");
    // Grabbing and storing the data-gif property value from the button
    var newGifSearch = $(this).attr("data-newGifsData");

    // Constructing a queryURL using the gif name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGifSearch + "&api_key=uc3bkWuX7MACY5zfZUqyFLMCwZfCl5ZU&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        // console.log(queryURL);

        console.log("gif", response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div class='gifs'>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p class='gifText'>").text("RATING: " + results[i].rating.toUpperCase());

          // Creating and storing an image tag
          var gifImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url)
          gifImage.attr("data-state", "still")
          gifImage.addClass("gif");

          // Appending the paragraph and image tag to the gifDiv
          gifDiv.append(p);
          gifDiv.append(gifImage);

          // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

  $("#gifs-appear-here").on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});
