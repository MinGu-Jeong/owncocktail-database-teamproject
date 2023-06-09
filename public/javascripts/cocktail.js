const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ownReceipeButton = document.getElementById("nav-own-cocktail");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");

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
// 칵테일 id 가져오기
// 칵테일 type (기본칵테일인지 나만의 칵테일인지) 가져오기
let searchParams = new URLSearchParams(window.location.search);
const cocktailId = searchParams.get("id");
const cocktailType = searchParams.get("type");
//console.log(searchParams.get("id"));
//console.log(searchParams.get("type"));

window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const deleteContainer = document.querySelector(".delete-container");
  const $recommentCount = document.querySelector(".recommend-count");

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

  if (user && user.id === "admin") {
    deleteContainer.style.display = "block";
  } else {
    // 그렇지 않으면 delete-container를 숨깁니다.
    deleteContainer.style.display = "none";
  }

  //db호출 부분
  if (cocktailType === "default") {
    fetch("/search/default_board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: cocktailId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $recommentCount.textContent = data[0].good_cnt;
      })
      .catch((error) => {
        console.error;
      });
  } else {
    fetch("/search/default_board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: cocktailId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error;
      });
  }
};
