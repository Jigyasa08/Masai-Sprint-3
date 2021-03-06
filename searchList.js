window.addEventListener("load", function () {
  var query = localStorage.getItem("query");
  var q = JSON.parse(query);
  console.log(query);
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q}`
  );
  xhr.send();
  xhr.onload = function () {
    if (xhr.status == 200) {
      var res = JSON.parse(xhr.response).drinks;
      console.log(res);
      display(res);
    } else {
      console.log("Error Code is:" + xhr.status);
    }
  };
});

const display = (data) => {
  var cards = document.getElementById("cards");
  for (var i = 0; i < data.length; i++) {
    // console.log(data[i].strDrinkThumb);
    var drink = createCard(data[i]);
    cards.append(drink);
  }
};

const createCard = (data) => {
  var card = document.createElement("div");
  var cardImage = document.createElement("img");
  var cardText = document.createElement("p");
  cardImage.src = data.strDrinkThumb;
  cardImage.style.width = "200px";
  cardText.textContent = data.strDrink;
  card.append(cardImage);
  card.append(cardText);
  card.addEventListener("click", function (e) {
    localStorage.setItem("drinkData", JSON.stringify(data));
    routePage(e.target);
  });
  return card;
};

function routePage() {
  location.href = "cocktailPage.html";
}
