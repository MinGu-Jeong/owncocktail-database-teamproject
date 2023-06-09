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
$mycocktailmain.addEventListener("click", () => {
  window.location.href = "./mycocktailmain.html";
});
$receipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});

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
  function dropdown() {
    var v = document.querySelector(".dropdown-content");
    var dropbtn = document.querySelector(".dropbtn");
    v.classList.toggle("show");
    dropbtn.style.borderColor = "rgb(94, 94, 94)";
  }
  const $ingredientName1 = document.querySelector("#ingredient-name1");
  const $ingredientName2 = document.querySelector("#ingredient-name2");
  const $ingredientName3 = document.querySelector("#ingredient-name3");
  const $ingredientName4 = document.querySelector("#ingredient-name4");
  const $ingredientName5 = document.querySelector("#ingredient-name5");
  const $ingredientName6 = document.querySelector("#ingredient-name6");
  const $ingredientName7 = document.querySelector("#ingredient-name7");
  const $ingredientName8 = document.querySelector("#ingredient-name8");
  const $ingredientId1 = document.querySelector("#ingredient-id1");
  const $ingredientId2 = document.querySelector("#ingredient-id2");
  const $ingredientId3 = document.querySelector("#ingredient-id3");
  const $ingredientId4 = document.querySelector("#ingredient-id4");
  const $ingredientId5 = document.querySelector("#ingredient-id5");
  const $ingredientId6 = document.querySelector("#ingredient-id6");
  const $ingredientId7 = document.querySelector("#ingredient-id7");
  const $ingredientId8 = document.querySelector("#ingredient-id8");
  function draw(path) {
    fetch(`/search/${path}_default_board`, {
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
        $ingredientName1.textContent = data[0].recipe_name;
        $ingredientName2.textContent = data[1].recipe_name;
        $ingredientName3.textContent = data[2].recipe_name;
        $ingredientName4.textContent = data[3].recipe_name;
        $ingredientName5.textContent = data[4].recipe_name;
        $ingredientName6.textContent = data[5].recipe_name;
        $ingredientName7.textContent = data[6].recipe_name;
        $ingredientName8.textContent = data[7].recipe_name;
        $ingredientId1.textContent = data[0].board_id;
        $ingredientId2.textContent = data[1].board_id;
        $ingredientId3.textContent = data[2].board_id;
        $ingredientId4.textContent = data[3].board_id;
        $ingredientId5.textContent = data[4].board_id;
        $ingredientId6.textContent = data[5].board_id;
        $ingredientId7.textContent = data[6].board_id;
        $ingredientId8.textContent = data[7].board_id;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  draw("popular");
  function showMenu(value) {
    dropbtn_content.innerText = value;
    dropbtn_content.style.color = "#252525";
    dropbtn.style.borderColor = "#3992a8";
    changeSort(value);
  }
  function changeSort(sortType) {
    // 선택된 정렬 방식에 따라 필요한 작업 수행
    if (sortType === "인기순") {
      draw("popular");
    } else if (sortType === "이름순") {
      draw("name");
    }

    // 드롭다운 숨기기
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.remove("active");
  }

  // default_board 게시글 수 카운트
  fetch("/search/default_board_count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      allPage = Math.floor(data[0].max_id / 8 + 1);
      const maxId = data[0].max_id || 0; // 만약 게시글이 없다면 0을 기본값으로 사용
      $pagetext.textContent = `1 / ${Math.floor(maxId / 8 + 1)}`; // 가장 큰 게시글 번호를 페이지 텍스트로 설정
    })
    .catch((error) => {
      console.error;
    });
};
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
function draw(path) {
  fetch(`/search/${path}_default_board`, {
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
}
draw("popular");
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
