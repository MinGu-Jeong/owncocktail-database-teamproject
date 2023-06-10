var searchParams = new URLSearchParams(window.location.search);
const ingredientId = searchParams.get("id");
const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");

const $titleLogo = document.querySelector(".title-logo");
$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
$loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});

$signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});

$ingredientButton.addEventListener("click", () => {
  window.location.href = "./ingredient.html";
});
$searchButton.addEventListener("click", () => {
  window.location.href = "./search.html";
});
$mycocktailmain.addEventListener("click", () => {
  window.location.href = "./mycocktailmain.html";
});
$receipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});
const $loginButtonTop = document.querySelector("#login-button");
const $signupButtonTop = document.querySelector("#signup-button");
const user = JSON.parse(sessionStorage.getItem("user"));
if (user && user.isLogin) {
  // 로그인이 된 상태
  $loginButtonTop.textContent = "로그아웃";
  $loginButtonTop.onclick = function () {
    // 로그아웃 로직 실행
    sessionStorage.removeItem("user"); // 세션스토리지에서 사용자 정보 삭제
    window.location.reload(); // 페이지 새로고침
  };

  $signupButtonTop.textContent = "마이페이지";
  $signupButtonTop.onclick = function () {
    // 마이페이지로 이동
    window.location.href = "./mypage.html";
  };
} else {
  // 로그인이 되지 않은 상태
  $loginButtonTop.onclick = function () {
    // 로그인 페이지로 이동
    window.location.href = "./login.html";
  };

  $signupButtonTop.onclick = function () {
    // 회원가입 페이지로 이동
    window.location.href = "./signup.html";
  };
}
const $ingredientName = document.querySelector("#ingredient-name1");
const $recipeName1 = document.querySelector("#recipe-name1");
const $recipeName2 = document.querySelector("#recipe-name2");
const $recipeName3 = document.querySelector("#recipe-name3");
const $recipeName4 = document.querySelector("#recipe-name4");
const $recipeName5 = document.querySelector("#recipe-name5");
$ingredientName.textContent = ingredientId;
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user && user.isLogin) {
    // 로그인이 된 상태
    $loginButtonTop.textContent = "로그아웃";
    $loginButtonTop.onclick = function () {
      // 로그아웃 로직 실행
      sessionStorage.removeItem("user"); // 세션스토리지에서 사용자 정보 삭제
      window.location.reload(); // 페이지 새로고침
    };

    $signupButtonTop.textContent = "마이페이지";
    $signupButtonTop.onclick = function () {
      // 마이페이지로 이동
      window.location.href = "./mypage.html";
    };
  } else {
    // 로그인이 되지 않은 상태
    $loginButtonTop.onclick = function () {
      // 로그인 페이지로 이동
      window.location.href = "./login.html";
    };

    $signupButtonTop.onclick = function () {
      // 회원가입 페이지로 이동
      window.location.href = "./signup.html";
    };
  }
};
console.log(ingredientId);
fetch(`/search/ingredient_board`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: `${ingredientId}`,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $recipeName1.textContent = data[0].recipe_name;
    $recipeName2.textContent = data[1].recipe_name;
    $recipeName3.textContent = data[2].recipe_name;
    $recipeName4.textContent = data[3].recipe_name;
    $recipeName5.textContent = data[4].recipe_name;
  })
  .catch((error) => {
    console.log(error);
  });
