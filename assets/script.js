var image = 0;
var activity = 0;
var historyTest = [];
const apiKey = "9319583f09msh1867038f13b6972p19a9c0jsnb8d29d2b9b68"

function start(e) {
  e.preventDefault();
  var cookTime = $('#cook-time').val();
  console.log(cookTime);
  var howMany = $('#how-many').val();
  getBoredApi(howMany);
  getFoodApi(cookTime);
}

//function to get activity
function getBoredApi(howMany) {
  var requestUrl = 'http://www.boredapi.com/api/activity?participants=' + howMany;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#subContainer').empty()
      activity = data.activity;
      console.log(data.activity);
      var activity = data.activity
      var h3 = $("<h3>").text(activity);
      $('#subContainer').append(h3);
    });
}

//function to get food image
function getFoodApi(cookTimeF) {
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
      function getRecipe() {
        var title = data.recipes[0].title
        var h2 = $("<h2>").text(title)
        var icon = data.recipes[0].image
        var image = $("<img>").attr("src", icon);
        var recipe = data.recipes[0].sourceUrl
        var linkRecipe = $("<a>").text("Link to recipe").attr("href", recipe);
        $('#subContainer').append(h2);
        $('#subContainer').append(image);
        $('#subContainer').append(linkRecipe);
      }

      var cookTimeApi = data.recipes[0].readyInMinutes
      console.log(data.recipes[0].readyInMinutes)

      console.log(cookTimeF);

      if (cookTimeF == "") {
        getRecipe();
      }
      else {
        if (cookTimeApi <= cookTimeF) {
          getRecipe();
          
        }
        else {
          getFoodApi(cookTimeF)
        }
      }
      cookTimeF = "";
      console.log(cookTimeF);
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

$("#foodActivityButton").on("click", start);
$("#storage").on("click", saveButton);


