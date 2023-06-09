const $titleLogo = document.querySelector(".title-logo");
$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// HTML 파일이 로드된 후 실행되는 함수
document.addEventListener("DOMContentLoaded", function () {
  // 버튼 요소 선택
  var myButton = document.getElementById("getUsersButton");

  // 버튼 클릭 이벤트 처리
  myButton.addEventListener("click", function () {
    // 클릭 이벤트 발생 시 실행되는 코드

    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        // 받아온 사용자 목록을 처리하는 코드 작성
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    /*
    fetch에서 매개변수 사용하려면?

    params는 URLSearchParams라는 새 변수를 만들어서 이렇게 선언해주면 된다.
    파이썬 딕셔너리처럼! 사용!
    C++에서는 아마 해시맵인가? 그럴거임

    const params = new URLSearchParams({
    limit: 10,
    sort: 'asc'
    });

    const url = `/users?${params}`;

    이렇게 '/users'와 같은 엔드포인트 뒤에 '?${params}' 추가!    

    */
  });
});

const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ownReceipeButton = document.getElementById("nav-own-cocktail");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");
$loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});

$signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
$receipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});
$ownReceipeButton.addEventListener("click", () => {
  window.location.href = "./mycocktailmain.html";
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
const $cocktailName1 = document.querySelector("#cocktail-name1");
const $cocktailName2 = document.querySelector("#cocktail-name2");
const $cocktailName3 = document.querySelector("#cocktail-name3");
const $cocktailName4 = document.querySelector("#cocktail-name4");
const $ownCocktailName1 = document.querySelector("#own-cocktail-name1");
const $ownCocktailName2 = document.querySelector("#own-cocktail-name2");
const $ownCocktailName3 = document.querySelector("#own-cocktail-name3");
const $ownCocktailName4 = document.querySelector("#own-cocktail-name4");
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

  //db연결
  //기본칵테일 4개 불러오기
  fetch("/search/popular_default_board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      num: 4,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      $cocktailName1.textContent = data[0].recipe_name;
      $cocktailName2.textContent = data[1].recipe_name;
      $cocktailName3.textContent = data[2].recipe_name;
      $cocktailName4.textContent = data[3].recipe_name;
    })
    .catch((error) => {

      console.error;

    });
  //나만의 칵테일 4개 불러오기
  fetch("/search/popular_my_board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      num: 4,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      $ownCocktailName1.textContent = data[0].recipe_name;
      $ownCocktailName2.textContent = data[1].recipe_name;
      $ownCocktailName3.textContent = data[2].recipe_name;
      $ownCocktailName4.textContent = data[3].recipe_name;
    })
    .catch((error) => {
      console.error;
    });
};

//best-cocktail-button-container 내부의 버튼 클릭시 cocktail.html로 이동
const $bestCocktailButtonContainer = document.querySelector(
  ".best-cocktail-button-container"
);
const $bestOwnCocktailButtonContainer = document.querySelector(
  ".best-own-cocktail-button-container"
);
$bestCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const cocktailName = cocktailButton.children[1].textContent;
  window.location.href = "./cocktail.html?id=" + cocktailName;
});
$bestOwnCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const cocktailName = cocktailButton.children[1].textContent;
  window.location.href = "./cocktail.html?id=" + cocktailName;
});
