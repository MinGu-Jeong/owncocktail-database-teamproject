const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");

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
$receipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});
function showLoginAlert() {
  alert("로그인 시 이용가능");
}
$mycocktailmain.addEventListener("click", showLoginAlert);

//로그인 성공 시 기능
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && user.isLogin) {
    // 로그인이 된 상태
    $mycocktailmain.removeEventListener("click", showLoginAlert);
    $mycocktailmain.addEventListener("click", () => {
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
};
function createItemElement(id, title, memberId, writeTime, goodCount) {
  // Create the item div
  const itemDiv = document.createElement("div");
  itemDiv.id = `item${id}`;
  itemDiv.classList.add("item");

  // Create the item-box div
  const itemBoxDiv = document.createElement("div");
  itemBoxDiv.id = "item-box";

  // Create the board_id p element
  const boardIdP = document.createElement("p");
  boardIdP.id = "board_id";
  boardIdP.textContent = id;

  // Create the board_title p element
  const boardTitleP = document.createElement("p");
  boardTitleP.id = "board_title";
  boardTitleP.textContent = title;

  // Create the member_id p element
  const memberIdP = document.createElement("p");
  memberIdP.id = "member_id";
  memberIdP.textContent = memberId;

  // Create the write_time p element
  const writeTimeP = document.createElement("p");
  writeTimeP.id = "write_time";
  writeTimeP.textContent = writeTime;

  // Create the good_cnt p element
  const goodCntP = document.createElement("p");
  goodCntP.id = "good_cnt";
  goodCntP.textContent = `추천수 ${goodCount}`;

  // Create the go-cocktail button
  const goCocktailButton = document.createElement("button");
  goCocktailButton.id = "go-cocktail";
  goCocktailButton.textContent = "바로가기";
  goCocktailButton.addEventListener("click", () => {
    const cocktailId = id; // 또는 필요한 id 값을 가져와서 할당
    console.log(cocktailId);
    if (typeof id === "string" && id.startsWith("my")) {
      window.location.href = `./cocktail.html?id=${String(id).slice(
        2
      )}&type=own`;
    } else {
      window.location.href = `./cocktail.html?id=${String(id)}&type=default`;
    }
  });
  // Append the elements to their respective parents
  itemBoxDiv.appendChild(boardIdP);
  itemBoxDiv.appendChild(boardTitleP);
  itemBoxDiv.appendChild(memberIdP);
  itemBoxDiv.appendChild(writeTimeP);
  itemBoxDiv.appendChild(goodCntP);
  itemDiv.appendChild(itemBoxDiv);
  itemDiv.appendChild(goCocktailButton);

  return itemDiv;
}

function clearResultBox() {
  const resultBoxDiv = document.querySelector(".result-box");
  while (resultBoxDiv.firstChild) {
    resultBoxDiv.removeChild(resultBoxDiv.firstChild);
  }
}
const searchInput = document.getElementById("search-input");
var inputData = "";

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    clearResultBox();
    inputData = searchInput.value;
    console.log("Input Data:", inputData);
    fetch("/search/board_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_target: `${inputData}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((data) => {
          console.log("test");
          var boardID;
          if (data.board_id == null) {
            boardID = `my${data.myboard_id}`;
          } else {
            boardID = data.board_id;
          }
          const itemElement = createItemElement(
            boardID,
            data.recipe_name,
            data.member_id,
            data.write_time.slice(0, 10),
            data.good_cnt
          );
          const resultBoxDiv = document.querySelector(".result-box");
          resultBoxDiv.appendChild(itemElement);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
