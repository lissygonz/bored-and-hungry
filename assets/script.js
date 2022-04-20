
function getBoredApi() {
  var requestUrl = 'http://www.boredapi.com/api/activity/';
  fetch(requestUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
       console.log(data.activity);
       var h3 = $("#h3").text(data.activity);
       $('#apiContainer').append(h3);
    });
}
function getFoodApi() {
  var requestUrl = 'https://foodish-api.herokuapp.com/api/';

  fetch(requestUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
       console.log(data.image);
       var img = $("#image").attr("src", data.image)
       $('#apiContainer').append(img);
    });
}

$("#foodActivityButton").on("click", getBoredApi);
$("#foodActivityButton").on("click", getFoodApi);
