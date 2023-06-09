const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");
const $titleLogo = document.querySelector(".title-logo");
const $newReceipeButton = document.getElementById("writeBTN");
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
$newReceipeButton.addEventListener("click", () => {
  window.location.href = "./new-receipe.html";
});
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  console.log("로그인 확인test");
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
  document.querySelector(".dropbtn_click").onclick = () => {
    dropdown();
  };
  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = () => {
      showMenu(options[i].innerText);
    };
  }

  function dropdown() {
    var v = document.querySelector(".dropdown-content");
    var dropbtn = document.querySelector(".dropbtn");
    v.classList.toggle("show");
    dropbtn.style.borderColor = "rgb(94, 94, 94)";
  }

  function showMenu(value) {
    console.log(value);
    dropbtn_content.innerText = value;
    dropbtn_content.style.color = "#252525";
    dropbtn.style.borderColor = "#3992a8";
  }
};
var dropbtn_icon = document.querySelector(".dropbtn_icon");
var dropbtn_content = document.querySelector(".dropbtn_content");
var dropbtn_click = document.querySelector(".dropbtn_click");
var dropbtn = document.querySelector(".dropbtn");

window.onclick = (e) => {
  if (!e.target.matches(".dropbtn_click")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const $pageText = document.getElementById("page-text");
const $pageLeftButton = document.getElementById("left-button");
const $pageRightButton = document.getElementById("right-button");
var pageCount = 1;
var allPage = 20;
$pageLeftButton.addEventListener("click", () => {
  if (pageCount > 1) {
    pageCount -= 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
  }
});
$pageRightButton.addEventListener("click", () => {
  if (pageCount < allPage) {
    pageCount += 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
  }
});

const $randomButton = document.getElementById("random-button");
$randomButton.addEventListener("click", () => {
  window.location.href = "./cocktail.html?id=" + cocktailId + "&type=default";
});

const $cocktailName1 = document.querySelector("#cocktail-name1");
const $cocktailName2 = document.querySelector("#cocktail-name2");
const $cocktailName3 = document.querySelector("#cocktail-name3");
const $cocktailName4 = document.querySelector("#cocktail-name4");
const $cocktailName5 = document.querySelector("#cocktail-name5");
const $cocktailName6 = document.querySelector("#cocktail-name6");
const $cocktailName7 = document.querySelector("#cocktail-name7");
const $cocktailName8 = document.querySelector("#cocktail-name8");
const $cocktailId1 = document.querySelector("#cocktail-id1");
const $cocktailId2 = document.querySelector("#cocktail-id2");
const $cocktailId3 = document.querySelector("#cocktail-id3");
const $cocktailId4 = document.querySelector("#cocktail-id4");
const $cocktailId5 = document.querySelector("#cocktail-id5");
const $cocktailId6 = document.querySelector("#cocktail-id6");
const $cocktailId7 = document.querySelector("#cocktail-id7");
const $cocktailId8 = document.querySelector("#cocktail-id8");
fetch("/search/popular_default_board", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    page: 1,
    num: 8,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $cocktailName1.textContent = data[0].recipe_name;
    $cocktailName2.textContent = data[1].recipe_name;
    $cocktailName3.textContent = data[2].recipe_name;
    $cocktailName4.textContent = data[3].recipe_name;
    $cocktailName5.textContent = data[4].recipe_name;
    $cocktailName6.textContent = data[5].recipe_name;
    $cocktailName7.textContent = data[6].recipe_name;
    $cocktailName8.textContent = data[7].recipe_name;
    $cocktailId1.textContent = data[0].board_id;
    $cocktailId2.textContent = data[1].board_id;
    $cocktailId3.textContent = data[2].board_id;
    $cocktailId4.textContent = data[3].board_id;
    $cocktailId5.textContent = data[4].board_id;
    $cocktailId6.textContent = data[5].board_id;
    $cocktailId7.textContent = data[6].board_id;
    $cocktailId8.textContent = data[7].board_id;
  })
  .catch((error) => {
    console.log(error);
  });
const $bestCocktailButtonContainer = document.querySelector(
  ".best-cocktail-button-container"
);
$bestCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const cocktailName = cocktailButton.children[1].textContent;
  const cocktailId = cocktailButton.children[2].textContent;
  console.log(cocktailId);
  console.log("test");
  window.location.href = "./cocktail.html?id=" + cocktailId + "&type=default";
});
