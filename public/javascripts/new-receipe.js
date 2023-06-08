const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
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

const $receipeAddButton = document.querySelector(".receipe-add-button");
const $snackAddButton = document.querySelector(".snack-add-button");
const $toolAddButton = document.querySelector(".tool-add-button");
const $receipeCard = document.querySelector(
  ".cocktail-ingredient-card-container"
);

$receipeAddButton.addEventListener("click", () => {
  const $receipeCard = document.querySelector(
    ".cocktail-ingredient-card-container"
  );
  const $cardFlexColumn = document.createElement("div");
  $cardFlexColumn.classList.add("card-flex-column");

  const $cocktailIngredientCard = document.createElement("div");
  $cocktailIngredientCard.classList.add("cocktail-ingredient-card");

  const $receipeImg = document.createElement("div");
  $receipeImg.classList.add("receipe-img");

  const $receipeImgButton = document.createElement("button");
  $receipeImgButton.classList.add("receipe-img-button");
  $receipeImgButton.textContent = "이미지 추가";

  $receipeImg.appendChild($receipeImgButton);
  $cocktailIngredientCard.appendChild($receipeImg);
  $cardFlexColumn.appendChild($cocktailIngredientCard);

  const $receipeDetailTitle = document.createElement("div");
  $receipeDetailTitle.classList.add("receipe-detail-title");

  const $receipeInput1 = document.createElement("input");
  $receipeInput1.classList.add("receipe-input");
  $receipeInput1.setAttribute("type", "text");
  $receipeInput1.setAttribute("placeholder", "재료 입력");

  const $receipeInput2 = document.createElement("input");
  $receipeInput2.classList.add("receipe-input");
  $receipeInput2.setAttribute("type", "text");
  $receipeInput2.setAttribute("placeholder", "용량 입력");

  $receipeDetailTitle.appendChild($receipeInput1);
  $receipeDetailTitle.appendChild($receipeInput2);
  $cardFlexColumn.appendChild($receipeDetailTitle);

  $receipeCard.appendChild($cardFlexColumn);
});

const $snackCardContainer = document.querySelector(".snack-container"); // 선택자 수정

$snackAddButton.addEventListener("click", () => {
  const $cardFlexColumn = document.createElement("div");
  $cardFlexColumn.classList.add("card-flex-column");

  const $snackCard = document.createElement("div");
  $snackCard.classList.add("cocktail-ingredient-card");

  const $snackImg = document.createElement("div");
  $snackImg.classList.add("receipe-img");

  const $snackImgButton = document.createElement("button");
  $snackImgButton.classList.add("receipe-img-button");
  $snackImgButton.textContent = "이미지 추가";

  $snackImg.appendChild($snackImgButton);
  $snackCard.appendChild($snackImg);
  $cardFlexColumn.appendChild($snackCard);

  const $snackDetailTitle = document.createElement("div");
  $snackDetailTitle.classList.add("receipe-detail-title");

  const $snackInput1 = document.createElement("input");
  $snackInput1.classList.add("receipe-input");
  $snackInput1.setAttribute("type", "text");
  $snackInput1.setAttribute("placeholder", "안주 입력");

  $snackDetailTitle.appendChild($snackInput1);
  $cardFlexColumn.appendChild($snackDetailTitle);

  $snackCardContainer.appendChild($cardFlexColumn); // 수정된 변수명 사용
});

const $toolCardContainer = document.querySelector(".tool-container"); // 선택자 수정

$toolAddButton.addEventListener("click", () => {
  const $cardFlexColumn = document.createElement("div");
  $cardFlexColumn.classList.add("card-flex-column");

  const $toolCard = document.createElement("div");
  $toolCard.classList.add("cocktail-ingredient-card");

  const $toolImg = document.createElement("div");
  $toolImg.classList.add("receipe-img");

  const $toolImgButton = document.createElement("button");
  $toolImgButton.classList.add("receipe-img-button");
  $toolImgButton.textContent = "이미지 추가";

  $toolImg.appendChild($toolImgButton);
  $toolCard.appendChild($toolImg);
  $cardFlexColumn.appendChild($toolCard);

  const $toolDetailTitle = document.createElement("div");
  $toolDetailTitle.classList.add("receipe-detail-title");

  const $toolInput1 = document.createElement("input");
  $toolInput1.classList.add("receipe-input");
  $toolInput1.setAttribute("type", "text");
  $toolInput1.setAttribute("placeholder", "도구 입력");

  $toolDetailTitle.appendChild($toolInput1);
  $cardFlexColumn.appendChild($toolDetailTitle);

  $toolCardContainer.appendChild($cardFlexColumn); // 수정된 변수명 사용
});
