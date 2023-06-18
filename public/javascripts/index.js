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

$ingredientButton.addEventListener("click", () => {
  window.location.href = "./ingredient.html";
});
$searchButton.addEventListener("click", () => {
  window.location.href = "./search.html";
});
function showLoginAlert() {
  alert("로그인 시 이용가능");
}
$ownReceipeButton.addEventListener("click", showLoginAlert);
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
const $cocktailId1 = document.querySelector("#cocktail-id1");
const $cocktailId2 = document.querySelector("#cocktail-id2");
const $cocktailId3 = document.querySelector("#cocktail-id3");
const $cocktailId4 = document.querySelector("#cocktail-id4");
const $ownCocktailId1 = document.querySelector("#own-cocktail-id1");
const $ownCocktailId2 = document.querySelector("#own-cocktail-id2");
const $ownCocktailId3 = document.querySelector("#own-cocktail-id3");
const $ownCocktailId4 = document.querySelector("#own-cocktail-id4");
const $ownCocktailimg1 = document.querySelector("#my-image-id1");
const $ownCocktailimg2 = document.querySelector("#my-image-id2");
const $ownCocktailimg3 = document.querySelector("#my-image-id3");
const $ownCocktailimg4 = document.querySelector("#my-image-id4");
const $defaultCocktailimg1 = document.querySelector("#default-image-id1");
const $defaultCocktailimg2 = document.querySelector("#default-image-id2");
const $defaultCocktailimg3 = document.querySelector("#default-image-id3");
const $defaultCocktailimg4 = document.querySelector("#default-image-id4");
const user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");

  if (user && user.isLogin) {
    // 로그인이 된 상태
    $ownReceipeButton.removeEventListener("click", showLoginAlert);
    $ownReceipeButton.addEventListener("click", () => {
      window.location.href = "./mycocktailmain.html";
    });
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
      console.log(data);
      $cocktailName1.textContent = data[0].recipe_name;
      $cocktailName2.textContent = data[1].recipe_name;
      $cocktailName3.textContent = data[2].recipe_name;
      $cocktailName4.textContent = data[3].recipe_name;
      $cocktailId1.textContent = data[0].board_id;
      $cocktailId2.textContent = data[1].board_id;
      $cocktailId3.textContent = data[2].board_id;
      $cocktailId4.textContent = data[3].board_id;
      findIMG([
        [$defaultCocktailimg1, $cocktailName1],
        [$defaultCocktailimg2, $cocktailName2],
        [$defaultCocktailimg3, $cocktailName3],
        [$defaultCocktailimg4, $cocktailName4],
      ]);
    })
    .catch((error) => {
      console.log(error);
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
      console.log(data);
      $ownCocktailName1.textContent = data[0].recipe_name;
      $ownCocktailName2.textContent = data[1].recipe_name;
      $ownCocktailName3.textContent = data[2].recipe_name;
      $ownCocktailName4.textContent = data[3].recipe_name;
      $ownCocktailId1.textContent = data[0].myboard_id;
      $ownCocktailId2.textContent = data[1].myboard_id;
      $ownCocktailId3.textContent = data[2].myboard_id;
      $ownCocktailId4.textContent = data[3].myboard_id;
      findIMG([
        [$ownCocktailimg1, $ownCocktailName1],
        [$ownCocktailimg2, $ownCocktailName2],
        [$ownCocktailimg3, $ownCocktailName3],
        [$ownCocktailimg4, $ownCocktailName4],
      ]);
    })
    .catch((error) => {
      console.log(error);
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
  const cocktailId = cocktailButton.children[2].textContent;
  window.location.href = "./cocktail.html?id=" + cocktailId + "&type=default";
});
$bestOwnCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const cocktailName = cocktailButton.children[1].textContent;
  const cocktailId = cocktailButton.children[2].textContent;
  if (user && user.isLogin) {
    window.location.href = "./cocktail.html?id=" + cocktailId + "&type=own";
  }
});
function findIMG(recipe) {
  fetch("/search/get_recipe_img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((data) => {
        recipe.forEach((recipe_info) => {
          if (data.recipe_name == recipe_info[1].textContent) {
            recipe_info[0].src = data.img_url;
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
