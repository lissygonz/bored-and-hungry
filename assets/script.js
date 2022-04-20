//function to get activity
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
}//function to get food image
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

//event listener for button to get activity and food image 
$("#foodActivityButton").on("click", getBoredApi);
$("#foodActivityButton").on("click", getFoodApi);
<<<<<<< HEAD


//set submission for local storage
localStorage.setItem("response", JSON.stringify(response));
=======
>>>>>>> 858927630a8b7038e28ac8a9e6a8598b1d88e168
