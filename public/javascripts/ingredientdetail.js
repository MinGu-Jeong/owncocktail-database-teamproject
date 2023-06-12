const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");
const $titleLogo = document.querySelector(".title-logo");
const $loginButtonTop = document.querySelector("#login-button");
const $signupButtonTop = document.querySelector("#signup-button");
const $ingredientName = document.querySelector("#ingredient-name1");
const $recipeNames = document.querySelectorAll(".recipe-name");
const $useRecipe = document.querySelector(".use-recipe");
const user = JSON.parse(sessionStorage.getItem("user"));
const ingredientId = new URLSearchParams(window.location.search).get("id");

function redirectTo(path) {
  window.location.href = path;
}

function showLoginAlert() {
  alert("로그인 시 이용가능");
}

function handleLogout() {
  sessionStorage.removeItem("user");
  window.location.reload();
}

function handleLogin() {
  redirectTo("./login.html");
}

function handleSignup() {
  redirectTo("./signup.html");
}

function handleMyCocktail() {
  redirectTo(user && user.isLogin ? "./mycocktailmain.html" : "./login.html");
}

function handleMypage() {
  redirectTo("./mypage.html");
}

$titleLogo.addEventListener("click", () => redirectTo("./index.html"));
$loginButton.addEventListener("click", handleLogin);
$signupButton.addEventListener("click", handleSignup);
$ingredientButton.addEventListener("click", () =>
  redirectTo("./ingredient.html")
);
$searchButton.addEventListener("click", () => redirectTo("./search.html"));
$receipeButton.addEventListener("click", () =>
  redirectTo("./cocktailmain.html")
);
$mycocktailmain.addEventListener("click", showLoginAlert);

if (user && user.isLogin) {
  $mycocktailmain.removeEventListener("click", showLoginAlert);
  $mycocktailmain.addEventListener("click", handleMyCocktail);
  $loginButtonTop.textContent = "로그아웃";
  $loginButtonTop.addEventListener("click", handleLogout);
  $signupButtonTop.textContent = "마이페이지";
  $signupButtonTop.addEventListener("click", handleMypage);
} else {
  $loginButtonTop.addEventListener("click", handleLogin);
  $signupButtonTop.addEventListener("click", handleSignup);
}

$ingredientName.textContent = ingredientId;

window.onload = function () {
  if (user && user.isLogin) {
    $loginButtonTop.textContent = "로그아웃";
    $loginButtonTop.addEventListener("click", handleLogout);
    $signupButtonTop.textContent = "마이페이지";
    $signupButtonTop.addEventListener("click", handleMypage);
  } else {
    $loginButtonTop.addEventListener("click", handleLogin);
    $signupButtonTop.addEventListener("click", handleSignup);
  }
};

console.log(ingredientId);

fetch(`/search/ingredient_board`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: ingredientId }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $recipeNames.forEach(($recipeName, index) => {
      if (data[index]) {
        $recipeName.textContent = data[index].recipe_name;
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

function goBoard(recipeName) {
  fetch(`/search/default_board_find_ID`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipe_name: `${recipeName}` }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == null) {
        console.log("없음");
      } else {
        window.location.href =
          "./cocktail.html?id=" + data[0].board_id + "&type=default";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

$useRecipe.addEventListener("click", (event) => {
  const clickedButton = event.target.closest(".recipe-button");
  if (clickedButton) {
    const recipeName = clickedButton.querySelector(".recipe-name").textContent;
    goBoard(recipeName);
  }
});

const ingredientImg = document.getElementById("ingredient-image");
