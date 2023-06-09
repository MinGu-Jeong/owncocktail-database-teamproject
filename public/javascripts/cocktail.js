const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
// 칵테일 id 가져오기
let searchParams = new URLSearchParams(window.location.search);
const cocktailId = searchParams.get("id");
//console.log(searchParams.get("id"));
//console.log(window.location);

window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const deleteContainer = document.querySelector(".delete-container");

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
  // fetch("엔드포인트 작성", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     member_id: user.id,
  //     passwd: changePassword,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(board_title);
  //   })
  //   .catch((error) => {
  //     error = 에러;
  //   });
};
