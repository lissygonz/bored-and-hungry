var image = 0;
var activity = 0;
var historyTest = [];
var result = false;
const apiKey = "9319583f09msh1867038f13b6972p19a9c0jsnb8d29d2b9b68"

function start(e) {
  e.preventDefault();
  result = true
  var cookTime = $('#cook-time').val();
  console.log(cookTime);
  var howMany = $('#how-many').val();
  getBoredApi(howMany);
  getFoodApi(cookTime);
  $('#img-col').empty()
  $('#text-col').empty()
  $('#link-col').empty()
}

//function to get activity
function getBoredApi(howMany) {
  var requestUrl = 'http://www.boredapi.com/api/activity?participants=' + howMany;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#activities-item-container').empty()
      activity = data.activity;
      console.log(data.activity);
      var activity = data.activity
      var h3 = $("<h3>").text(activity);
      $('#activities-item-container').append(h3);
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
      console.log(data);
      var title = data.recipes[0].title
      var h2 = $("<h2>").text(title).css({"font-size": "40px"});
      var icon = data.recipes[0].image
      var image = $("<img>").attr("src", icon).css({"width": "400px", "border-radius": "20px"});
      var recipe = data.recipes[0].sourceUrl
      var linkRecipe = $("<a>").text("Link to recipe").attr("href", recipe).css({"padding": "5px 5px 5px 5px", "background-color": "rgb(199, 40, 40)", "text-decoration": "none", "color": "white",});
      $('#img-col').append(image);
      $('#text-col').append(h2);
      $('#text-col').append(linkRecipe);
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

  $("#img-col-r1").empty()
  $("#activities-item-container-r1").empty()
  $("#text-col-r1").empty()
  // set new submission to local storage

  for (var i = 1; i < 3; i++) {
  if (result == true)
   {
     var historyTest = JSON.parse(localStorage.getItem("historyTest")) || [];

     var user = {
      activity: activity,
      image: icon,
      title: title,
      recipe: recipe
    };

    historyTest.push(user);
    localStorage.setItem("historyTest", JSON.stringify(historyTest));
       //var historyTmp = localStorage.getItem(“historyTest”);
      console.log(historyTest[historyTest.length-1].activity);

      var newDiv = $("<div>");
      var image = $("<img>").attr("src", user.activity).css({"width": "40px", "border-radius": "20px"});
      console.log(user.activity);
      var h2 = $("<h2>").text(activity).css({"font-size": "10px"});
      var linkRecipe = $("<a>").text("Link to recipe").attr("href", recipe).css({"padding": "5px 5px 5px 5px", "background-color": "rgb(199, 40, 40)", "text-decoration": "none", "color": "white",});
    
      newDiv.append(h2, image, linkRecipe);
      $("#recent-items").append(newDiv);
   }
   else{
   }
  }
};

//event listener for button to get activity and food image 

$("#foodActivityButton").on("click", start);
$("#storage").on("click", saveButton);


