var repoList = document.querySelector('ul');

function getApibored() {
  // Replace `octocat` with anyone else's GitHub username
  var requestUrl = 'https://foodish-api.herokuapp.com/images/api/#';

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    });
}

fetchButton.addEventListener('click', getApibored);

function getApihungry() {
  // Replace `octocat` with anyone else's GitHub username
  var requestUrl = 'https://foodish-api.herokuapp.com/images/api/#';

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    });
}

fetchButton.addEventListener('click', getApihungry);