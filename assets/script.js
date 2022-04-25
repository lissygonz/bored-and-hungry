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
      var activity = data.activity
      var h3 = $("<h3>").text(activity);
      $('#subContainer').append(h3);
    });
}

//function to get food image
function getFoodApi() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '9319583f09msh1867038f13b6972p19a9c0jsnb8d29d2b9b68'
    }
  };

  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random', options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $('#subContainer').empty()
      var icon = data.recipes[0].image
      var image = $("<img>").attr("src", icon);
      var recipe = data.recipe[0].instructions
      var precipe = $("<p>").text(recipe)
      $('#subContainer').append(image);
      $('#subContainer').append(precipe);

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


