function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("active");
}

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

const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
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
