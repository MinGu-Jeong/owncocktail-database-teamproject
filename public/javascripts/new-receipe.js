const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
let receipeCount = 0;
let snackCount = 0;
let toolCount = 0;
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
  //작성자
  $writerValue = document.querySelector("#writer-value");
  $writerValue.textContent = user.id;
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
  $receipeInput1.addEventListener("input", (e) => {
    receipeArray[receipeCount] = e.target.value; // 배열에 해당 요소의 값을 저장
  });
  $receipeInput2.addEventListener("input", (e) => {
    receipeArray[receipeCount + 1] = e.target.value; // 배열에 해당 요소의 값을 저장
  });
  console.log(receipeArray);
  receipeCount = receipeCount + 2;
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
  $snackInput1.classList.add("snack-input");
  $snackInput1.setAttribute("type", "text");
  $snackInput1.setAttribute("placeholder", "안주 입력");

  $snackDetailTitle.appendChild($snackInput1);
  $cardFlexColumn.appendChild($snackDetailTitle);

  $snackCardContainer.appendChild($cardFlexColumn); // 수정된 변수명 사용
  $snackInput1.addEventListener("input", (e) => {
    snackArray[snackCount] = e.target.value; // 배열에 해당 요소의 값을 저장
  });
  snackCount++;
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
  $toolInput1.classList.add("tool-input");
  $toolInput1.setAttribute("type", "text");
  $toolInput1.setAttribute("placeholder", "도구 입력");

  $toolDetailTitle.appendChild($toolInput1);
  $cardFlexColumn.appendChild($toolDetailTitle);

  $toolCardContainer.appendChild($cardFlexColumn); // 수정된 변수명 사용
  $toolInput1.addEventListener("input", (e) => {
    toolArray[toolCount] = e.target.value; // 배열에 해당 요소의 값을 저장
  });
  toolCount++;
});
const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");
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

const $submitButton = document.querySelector("#submit-button");
const $cocktailName = document.querySelector("#cocktail-name");
let receipeArray = [];
let snackArray = [];
let toolArray = [];
const $receipeText = document.querySelector("#receipe-textarea");
const user = JSON.parse(sessionStorage.getItem("user"));
$submitButton.addEventListener("click", () => {
  let receipeString = receipeArray.slice(2).join(",");
  let snackString = snackArray.slice(1).join(", ");
  let toolString = toolArray.slice(1).join(", ");
  console.log(receipeString);
  console.log(snackString);
  console.log(toolString);
  const user = JSON.parse(sessionStorage.getItem("user"));
  fetch("/write/my_board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipe_name: $cocktailName.value,
      member_id: user.id,
      board_ingredient: receipeString,
      board_snack: snackString,
      board_tool: toolString,
      board_text: $receipeText.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.result[0].myboard_id);
      window.location.href =
        "./cocktail.html?id=" + data.result[0].myboard_id + "&type=own";
    })
    .catch((error) => {
      console.error;
    });
});
