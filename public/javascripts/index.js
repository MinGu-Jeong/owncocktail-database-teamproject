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
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");

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
