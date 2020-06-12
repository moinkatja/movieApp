'use strict';
$(function() {

function getMovies(query) {
    fetch("http://omdbapi.com/?s=" + query + "&apikey=thewdb")
    .then(
        successResponse => {
            if (successResponse.status != 200) {
            return null;
            } else {
            return successResponse.json();
            }
        })
    .then(successResponse => displayResults(successResponse))
    .catch(err => {
        $(".js-search-results").text(`Something went wrong: ${err.message}`);
      });

}

function displayResults(successResponse) {
    $(".js-search-results").empty();
    if (successResponse.Search.length>0) {
        for (let i=0; i<successResponse.Search.length; i++) {
            $(".js-search-results").append(
                "<li><strong>"+ 
                successResponse.Search[i].Title 
                + "</strong>, " 
                + successResponse.Search[i].Year 
                + "<br><img src=" + successResponse.Search[i].Poster + "></li>");
        }
    }
    else {
        $(".js-search-results").append("Not found!");
    }
}

function watchForm() {
$(".js-search-form").on("submit", function(event) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let mov= queryTarget.val();
    queryTarget.val("");
    getMovies(mov);
});
}

$(watchForm);
});