var image = 0;
var activity = 0;
var historyTest = [];
const apiKey = "9319583f09msh1867038f13b6972p19a9c0jsnb8d29d2b9b68"



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
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '9319583f09msh1867038f13b6972p19a9c0jsnb8d29d2b9b68'
    }
  };
  
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
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




//set submission for local storage
localStorage.setItem("response", JSON.stringify(response));


