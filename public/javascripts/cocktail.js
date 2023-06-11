const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $recipeButton = document.getElementById("nav-cocktail-recipe");
const $ownRecipeButton = document.getElementById("nav-own-cocktail");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");

$loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});

$signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
$recipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});
$ownRecipeButton.addEventListener("click", () => {
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
  const $cocktailRecipe = document.querySelector(".cocktail-recipe-container");
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
  //기본칵테일인경우
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
        // 재료 api 시작
        fetch("/search/search_recipe", {
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
            // 칵테일 재료 카드 컨테이너 찾기
            let $cocktailIngredientCardContainer = document.querySelector(
              ".cocktail-ingredient-card-container"
            );

            // 이미 존재하는 칵테일 재료 카드들을 모두 삭제
            $cocktailIngredientCardContainer.innerHTML = "";
            // 칵테일 재료 카드 생성 후 컨테이너에 추가
            for (let i = 0; i < data.length; i++) {
              // data크기를 data.length로 변경
              let $cocktailIngredientCard = document.createElement("div");
              $cocktailIngredientCard.classList.add("cocktail-ingredient-card");
              let $recipeDetail = document.createElement("div");
              $recipeDetail.classList.add("recipe-detail");

              $recipeDetail.textContent = data[i].ingredient_name; // 재료 이름을 카드에 표시하려는 경우

              // $ingredientDetail를 $cocktailIngredientCard에 추가
              $cocktailIngredientCard.appendChild($recipeDetail);

              $cocktailIngredientCardContainer.appendChild(
                $cocktailIngredientCard
              );
            }
          })
          .catch((error) => {
            console.error;
          });
        // 재료 api 끝
        //작성자
        $writerValue = document.querySelector("#writer-value");
        $writerValue.textContent = data[0].member_id;
        const $cocktailTitle = document.querySelector(".cocktail-title");
        console.log(data);
        $cocktailTitle.textContent = data[0].recipe_name;
        $recommentCount.textContent = data[0].good_cnt;
        $cocktailRecipe.innerHTML = data[0].text;
        let snacks = data[0].snack;
        let snackArray = snacks.split(",");
        const snackArraySize = snackArray.length;
        let tools = data[0].tool;
        let toolArray = tools.split(",");
        const toolArraySize = toolArray.length;

        // 스낵 카드 컨테이너 찾기
        let $snackContainer = document.querySelector(".snack-container");
        // 이미 존재하는 스낵 카드들을 모두 삭제
        $snackContainer.innerHTML = "";

        // 스낵 카드 생성 후 컨테이너에 추가
        for (let i = 0; i < snackArraySize; i++) {
          let $snackCard = document.createElement("div");
          $snackCard.classList.add("snack-card");
          let $snackDetail = document.createElement("div");
          $snackDetail.classList.add("snack-detail");
          $snackDetail.textContent = snackArray[i]; // 스낵 이름을 카드에 표시하려는 경우
          // $snackDetail를 $snackCard에 추가
          $snackCard.appendChild($snackDetail);
          $snackContainer.appendChild($snackCard);
        }
        let $toolContainer = document.querySelector(".tool-container");
        $toolContainer.innerHTML = "";
        for (let i = 0; i < toolArraySize; i++) {
          let $toolCard = document.createElement("div");
          $toolCard.classList.add("tool-card");
          let $toolDetail = document.createElement("div");
          $toolDetail.classList.add("tool-detail");
          $toolDetail.textContent = toolArray[i];
          $toolCard.appendChild($toolDetail);
          $toolContainer.appendChild($toolCard);
        }
      })
      .catch((error) => {
        console.error;
      });
  } else {
    //나만의칵테일인 경우
    fetch("/search/my_board", {
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
        // 재료 api 시작
        fetch("/search/search_my_recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            myboard_id: cocktailId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // 칵테일 재료 카드 컨테이너 찾기
            let $cocktailIngredientCardContainer = document.querySelector(
              ".cocktail-ingredient-card-container"
            );

            // 이미 존재하는 칵테일 재료 카드들을 모두 삭제
            $cocktailIngredientCardContainer.innerHTML = "";
            // 칵테일 재료 카드 생성 후 컨테이너에 추가
            for (let i = 0; i < data.length; i++) {
              // data크기를 data.length로 변경
              let $cocktailIngredientCard = document.createElement("div");
              $cocktailIngredientCard.classList.add("cocktail-ingredient-card");
              let $recipeDetail = document.createElement("div");
              $recipeDetail.classList.add("recipe-detail");

              $recipeDetail.textContent = data[i].ingredient_name; // 재료 이름을 카드에 표시하려는 경우

              // $ingredientDetail를 $cocktailIngredientCard에 추가
              $cocktailIngredientCard.appendChild($recipeDetail);

              $cocktailIngredientCardContainer.appendChild(
                $cocktailIngredientCard
              );
            }
          })
          .catch((error) => {
            console.error;
          });
        // 재료 api 끝
        //작성자
        $writerValue = document.querySelector("#writer-value");
        $writerValue.textContent = data[0].member_id;
        const $cocktailTitle = document.querySelector(".cocktail-title");
        console.log(data);
        $cocktailTitle.textContent = data[0].recipe_name;
        $recommentCount.textContent = data[0].good_cnt;
        $cocktailRecipe.innerHTML = data[0].text;
        let snacks = data[0].snack;
        let snackArray = snacks.split(",");
        const snackArraySize = snackArray.length;
        let tools = data[0].tool;
        let toolArray = tools.split(",");
        const toolArraySize = toolArray.length;

        // 스낵 카드 컨테이너 찾기
        let $snackContainer = document.querySelector(".snack-container");
        // 이미 존재하는 스낵 카드들을 모두 삭제
        $snackContainer.innerHTML = "";

        // 스낵 카드 생성 후 컨테이너에 추가
        for (let i = 0; i < snackArraySize; i++) {
          let $snackCard = document.createElement("div");
          $snackCard.classList.add("snack-card");
          let $snackDetail = document.createElement("div");
          $snackDetail.classList.add("snack-detail");
          $snackDetail.textContent = snackArray[i]; // 스낵 이름을 카드에 표시하려는 경우
          // $snackDetail를 $snackCard에 추가
          $snackCard.appendChild($snackDetail);
          $snackContainer.appendChild($snackCard);
        }
        let $toolContainer = document.querySelector(".tool-container");
        $toolContainer.innerHTML = "";
        for (let i = 0; i < toolArraySize; i++) {
          let $toolCard = document.createElement("div");
          $toolCard.classList.add("tool-card");
          let $toolDetail = document.createElement("div");
          $toolDetail.classList.add("tool-detail");
          $toolDetail.textContent = toolArray[i];
          $toolCard.appendChild($toolDetail);
          $toolContainer.appendChild($toolCard);
        }
      })
      .catch((error) => {
        console.error;
      });
  }
};

function addcomment(member_id, text, datetime, good_cnt, comment_id) {
  // 댓글 카드 요소 생성
  const commentCard = document.createElement("div");
  commentCard.classList.add("comment-card");

  // 작성자 요소 생성
  const userElement = document.createElement("div");
  userElement.classList.add("comment-user");
  userElement.textContent = `작성자: ${member_id}`;

  // 댓글 내용 요소 생성
  const commentTextElement = document.createElement("div");
  commentTextElement.classList.add("comment-text");
  commentTextElement.textContent = text;

  // 댓글 날짜 요소 생성
  const commentDateElement = document.createElement("div");
  commentDateElement.classList.add("comment-date");
  commentDateElement.textContent = datetime;

  // 좋아요 버튼 요소 생성
  const positiveButton = document.createElement("button");
  positiveButton.classList.add("positive");
  positiveButton.textContent = `${good_cnt} 👍`;

  // comment_id를 데이터 속성으로 저장
  positiveButton.setAttribute("data-comment-member", member_id);

  // positive 버튼에 이벤트 리스너 추가
  positiveButton.addEventListener("click", function () {
    const memberID = this.getAttribute("data-comment-member");
    console.log(memberID);
    clickgoodbutton(memberID);
    // 댓글 ID를 활용하여 추가 동작 수행
  });

  // 작성자, 댓글 내용, 댓글 날짜, 좋아요 버튼 요소를 댓글 카드에 추가
  commentCard.appendChild(userElement);
  commentCard.appendChild(commentTextElement);
  commentCard.appendChild(commentDateElement);
  commentCard.appendChild(positiveButton);

  // 댓글 카드 컨테이너 요소 가져오기
  const $commentCardContainer = document.querySelector(
    ".comment-card-container"
  );

  // 댓글 카드를 컨테이너에 추가
  $commentCardContainer.appendChild(commentCard);
}

fetch("/search/default_comment", {
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
    console.log("댓글 불러오기");
    console.log(data);
    data.forEach((data) => {
      console.log("test");
      addcomment(
        data.member_id,
        data.text,
        data.datetime.slice(0, 10),
        data.good_cnt,
        data.board_comment_id
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
const $commentInput = document.getElementById("comment-input");
const $commentInputBTN = document.getElementById("comment-button");
var inputData = "";
const user = JSON.parse(sessionStorage.getItem("user"));
//댓글 작성
$commentInputBTN.addEventListener("click", function (event) {
  inputData = $commentInput.value;
  console.log(inputData);
  fetch("/write/default_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: `${inputData}`,
      member_id: `${user.id}`,
      board_id: `${cocktailId}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("댓글 불러오기");
      data.forEach((data) => {
        console.log("test");
        addcomment(
          data.member_id,
          data.text,
          data.datetime.slice(0, 10),
          data.good_cnt
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
//댓글 좋아요
function clickgoodbutton(member_id) {
  fetch("/write/good_default_board_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: `${member_id}`,
      board_comment_id: `${cocktailId}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
