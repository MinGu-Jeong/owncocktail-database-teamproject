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
const $cocktailImage = document.querySelector(".cocktail-img");
const $cocktailTitle = document.querySelector(".cocktail-title");
const $cocktailImageID = document.getElementById("cocktail-img1");
$loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});

$signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
$recipeButton.addEventListener("click", () => {
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
$ownRecipeButton.addEventListener("click", showLoginAlert);
// 칵테일 id 가져오기
// 칵테일 type (기본칵테일인지 나만의 칵테일인지) 가져오기
let searchParams = new URLSearchParams(window.location.search);
const cocktailId = searchParams.get("id");
const cocktailType = searchParams.get("type");
//console.log(searchParams.get("id"));
//console.log(searchParams.get("type"));
const user = JSON.parse(sessionStorage.getItem("user"));
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const deleteContainer = document.querySelector(".delete-container");
  const $recommendCount = document.querySelector(".recommend-count");
  const $cocktailRecipe = document.querySelector(".cocktail-recipe-container");
  if (user && user.isLogin) {
    // 로그인이 된 상태
    $ownRecipeButton.removeEventListener("click", showLoginAlert);
    $ownRecipeButton.addEventListener("click", () => {
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

  // if (user && user.id === "admin") {
  //   deleteContainer.style.display = "block";
  // } else {
  //   // 그렇지 않으면 delete-container를 숨깁니다.
  //   deleteContainer.style.display = "none";
  // }

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
        console.log("이름");
        findIMG(data[0].recipe_name);
        console.log(data[0].recipe_name);
        console.log($cocktailImageID.src);
        if (user && data[0].member_id == user.id) {
          deleteContainer.style.display = "block";
        } else {
          deleteContainer.style.display = "none";
        }
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
              let $cocktailIngredientCard = document.createElement("div");
              $cocktailIngredientCard.classList.add("cocktail-ingredient-card");

              let $cardContent = document.createElement("div"); // 추가된 부분
              $cardContent.classList.add("card-content"); // 추가된 부분

              let $cocktailIngredientCardImg = document.createElement("img");
              $cocktailIngredientCardImg.classList.add("recipe-img");
              $cocktailIngredientCardImg.src = data[i].ingredient_img_url;

              $cardContent.appendChild($cocktailIngredientCardImg); // 변경된 부분

              let $recipeDetail = document.createElement("div");
              $recipeDetail.classList.add("recipe-detail");
              $recipeDetail.textContent = data[i].ingredient_name;

              //용량
              let $recipeRatio = document.createElement("div");
              $recipeRatio.classList.add("recipe-ratio");
              $recipeRatio.textContent = data[i].ratio;

              $cardContent.appendChild($recipeDetail); // 변경된 부분
              $cardContent.appendChild($recipeRatio); // 변경된 부분

              $cocktailIngredientCard.appendChild($cardContent); // 추가된 부분

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
        $recommendCount.textContent = data[0].good_cnt;
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
        findIMG(data[0].recipe_name);
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
              //용량
              let $recipeRatio = document.createElement("div");
              $recipeRatio.classList.add("recipe-ratio");
              $recipeRatio.textContent = data[i].ratio;
              // $ingredientDetail를 $cocktailIngredientCard에 추가
              $cocktailIngredientCard.appendChild($recipeDetail);
              $cocktailIngredientCard.appendChild($recipeRatio);

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

        console.log(data);
        $cocktailTitle.textContent = data[0].recipe_name;
        $recommendCount.textContent = data[0].good_cnt;
        $cocktailRecipe.innerHTML = data[0].text;
        let snacks = data[0].snack;
        let snackArray = snacks.split(",");
        const snackArraySize = snackArray.length;
        let tools = data[0].tool;
        let toolArray = tools.split(",");
        const toolArraySize = toolArray.length;
        console.log($cocktailTitle.textContent);

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

const $deleteBtn = document.getElementById("delete-button");
$deleteBtn.addEventListener("click", function (event) {
  const $cocktailTitle = document.querySelector(".cocktail-title");
  if (cocktailType == "default") {
    fetch("/write/default_delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: cocktailId,
        member_id: user.id,
        recipe_name: $cocktailTitle.textContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result == false) {
          alert(data.message);
        } else {
          window.location.href = "./index.html";
        }
      });
  } else {
    fetch("/write/my_delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: cocktailId,
        member_id: user.id,
        recipe_name: $cocktailTitle.textContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result == false) {
          alert(data.message);
        } else {
          window.location.href = "./index.html";
        }
      });
  }
});

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
  positiveButton.setAttribute("data-comment-id", comment_id);
  //댓글 순서
  const currentOrder = document.querySelectorAll(".comment-card").length;
  positiveButton.setAttribute("data-order", currentOrder);
  // positive 버튼에 이벤트 리스너 추가
  positiveButton.addEventListener("click", function () {
    const board_comment_id = this.getAttribute("data-comment-id");
    if (cocktailType == "default") {
      clickgoodbuttonDefault(board_comment_id);
    } else {
      clickgoodbuttonMY(board_comment_id);
    }
    window.location.reload();
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

if (cocktailType == "default") {
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
} else {
  fetch("/search/my_comment", {
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
      console.log("댓글 불러오기");
      console.log(data);
      data.forEach((data) => {
        console.log("나만의 댓글");
        console.log(data);
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
}
const $commentInput = document.getElementById("comment-input");
const $commentInputBTN = document.getElementById("comment-button");
var inputData = "";
//댓글 작성
$commentInputBTN.addEventListener("click", function (event) {
  inputData = $commentInput.value;
  console.log(inputData);
  console.log(user.id);
  console.log(cocktailId);
  fetch("/write/default_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: inputData,
      member_id: user.id,
      board_id: cocktailId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("댓글 작성");
      console.log(data);
      window.location.reload();
      //새 댓글도 추가
      // addcomment(
      //   data.member_id,
      //   data.text,
      //   data.datetime.slice(0, 10),
      //   data.good_cnt
      // );
    })
    .catch((error) => {
      console.log(error);
    });
});

//댓글 좋아요
function clickgoodbuttonDefault(board_comment_id) {
  fetch("/write/good_default_board_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: `${user.id}`,
      board_comment_id: `${board_comment_id}`,
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
function clickgoodbuttonMY(board_comment_id) {
  console.log(user.id);
  fetch("/write/good_my_board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: `${user.id}`,
      board_comment_id: `${board_comment_id}`, //수정해야함
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
//게시글 추천 기능
const $recommendButton = document.querySelector(".recommend");
$recommendButton.addEventListener("click", (event) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (cocktailType == "default") {
    fetch("/write/good_default_board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: cocktailId,
        member_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error;
      });
  } else {
    console.log("own");
  }
});

function findIMG(receipe) {
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
        if (data.recipe_name == receipe) {
          $cocktailImageID.src = data.img_url;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
