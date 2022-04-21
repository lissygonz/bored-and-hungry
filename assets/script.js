var image = 0;
var activity = 0;
var historyTest = [];



//function to get activity
function getBoredApi() {
  var requestUrl = 'http://www.boredapi.com/api/activity/';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      activity = data.activity;
      console.log(data.activity);
      var h3 = $("#h3").text(data.activity);
      $('#apiContainer').append(h3);


    });
}//function to get food image
function getFoodApi() {
  var requestUrl = 'https://foodish-api.herokuapp.com/api/';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      image = data.image;
      console.log(data.image);
      var img = $("#image").attr("src", data.image)
      $('#apiContainer').append(img);



    });
}
function saveButton() {
  var user = {
    activity: activity,
    image: image
  };
  // set new submission to local storage
  historyTest.push(user);
  localStorage.setItem("history", JSON.stringify(historyTest));
  console.log(historyTest);




};







//event listener for button to get activity and food image 
$("#foodActivityButton").on("click", getBoredApi);
$("#foodActivityButton").on("click", getFoodApi);
$("#storage").on("click", saveButton);
