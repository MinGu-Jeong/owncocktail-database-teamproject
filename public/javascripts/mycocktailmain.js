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
  s;
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

function changeSort(sortType) {
  // 선택된 정렬 방식에 따라 필요한 작업 수행
  if (sortType === "popular") {
    // 인기순 정렬 처리
    // ...
  } else if (sortType === "name") {
    // 이름순 정렬 처리
    // ...
  } else if (sortType === "comment") {
    // 댓글순 정렬 처리
    // ...
  }

  // 드롭다운 숨기기
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.remove("active");
}
var dropbtn_icon = document.querySelector(".dropbtn_icon");
var dropbtn_content = document.querySelector(".dropbtn_content");
var dropbtn_click = document.querySelector(".dropbtn_click");
var dropbtn = document.querySelector(".dropbtn");

window.onload = () => {
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

$pageText = document.getElementById("page-text");
$pageLeftButton = document.getElementById("left-button");
$pageRightButton = document.getElementById("right-button");
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
  window.location.href = "./cocktail.html";
});
