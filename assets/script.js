var title ;
var icon ;
var recipe ;
var activity ;
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
      title = data.recipes[0].title
      var h2 = $("<h2>").text(title).css({"font-size": "40px"});
      icon = data.recipes[0].image
      var image = $("<img>").attr("src", icon).css({"width": "400px", "border-radius": "20px"});
      recipe = data.recipes[0].sourceUrl
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
  var user = {
    activity: activity,
    image: icon,
    title: title,
    recipe: recipe
  };
  $('#img-col-r1').empty()
  $('#text-col-r1').empty()
  $('#link-col-r1').empty()
  // set new submission to local storage

  if (result == true)
   {
    historyTest.push(user);
    localStorage.setItem("historyTest", JSON.stringify(historyTest));
       //var historyTmp = localStorage.getItem("historyTest");
      console.log(historyTest[historyTest.length-1].activity);
       var h2 = $("<h2>").text(historyTest[0].activity).css({"font-size": "10px"});
       var image = $("<img>").attr("src", icon).css({"width": "40px", "border-radius": "20px"});
       var linkRecipe = $("<a>").text("Link to recipe").attr("href", recipe).css({"padding": "5px 5px 5px 5px", "background-color": "rgb(199, 40, 40)", "text-decoration": "none", "color": "white",});
             $('#img-col-r1').append(image);
             $('#text-col-r1').append(h2);
             $('#text-col-r1').append(linkRecipe);
       
       
   }
   else{

   }
};

//event listener for button to get activity and food image 

$("#foodActivityButton").on("click", start);
$("#storage").on("click", saveButton);


