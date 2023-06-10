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

var dropbtn_icon = document.querySelector(".dropbtn_icon");
var dropbtn_content = document.querySelector(".dropbtn_content");
var dropbtn_click = document.querySelector(".dropbtn_click");
var dropbtn = document.querySelector(".dropbtn");
var pageCount = 1;
var allPage = 20;
const options = document.getElementsByClassName("option");
window.onload = function () {
  document.querySelector(".dropbtn_click").onclick = () => {
    dropdown();
  };
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

  draw("popular", pageCount);

  // default_board 게시글 수 카운트
  fetch("/search/ingredient_count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("갯수");
      console.log(data);
      allPage = Math.floor(data[0].max_id / 8 + 1);
      const maxId = data[0].max_id || 0; // 만약 게시글이 없다면 0을 기본값으로 사용
      $pagetext.textContent = `1 / ${Math.floor(maxId / 8 + 1)}`; // 가장 큰 게시글 번호를 페이지 텍스트로 설정
    })
    .catch((error) => {
      console.error;
    });
};
const $ingredientName1 = document.querySelector("#ingredient-name1");
const $ingredientName2 = document.querySelector("#ingredient-name2");
const $ingredientName3 = document.querySelector("#ingredient-name3");
const $ingredientName4 = document.querySelector("#ingredient-name4");
const $ingredientName5 = document.querySelector("#ingredient-name5");
const $ingredientName6 = document.querySelector("#ingredient-name6");
const $ingredientName7 = document.querySelector("#ingredient-name7");
const $ingredientName8 = document.querySelector("#ingredient-name8");
function showMenu(value) {
  dropbtn_content.innerText = value;
  dropbtn_content.style.color = "#252525";
  dropbtn.style.borderColor = "#3992a8";
  changeSort(value, pageCount);
}
function changeSort(sortType, thispage) {
  // 선택된 정렬 방식에 따라 필요한 작업 수행
  if (sortType === "사용순") {
    draw("popular", thispage);
  } else if (sortType === "이름순") {
    draw("name", thispage);
  }

  // 드롭다운 숨기기
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.remove("active");
}
function draw(path, thispage) {
  fetch(`/search/${path}_ingredient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: thispage,
      num: 8,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      $ingredientName1.textContent = data[0].ingredient_name;
      $ingredientName2.textContent = data[1].ingredient_name;
      $ingredientName3.textContent = data[2].ingredient_name;
      $ingredientName4.textContent = data[3].ingredient_name;
      $ingredientName5.textContent = data[4].ingredient_name;
      $ingredientName6.textContent = data[5].ingredient_name;
      $ingredientName7.textContent = data[6].ingredient_name;
      $ingredientName8.textContent = data[7].ingredient_name;
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

$pageLeftButton.addEventListener("click", () => {
  if (pageCount > 1) {
    pageCount -= 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
    changeSort(dropbtn_content.innerText, pageCount);
  }
});
$pageRightButton.addEventListener("click", () => {
  if (pageCount < allPage) {
    pageCount += 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
    changeSort(dropbtn_content.innerText, pageCount);
  }
});

const $bestCocktailButtonContainer = document.querySelector(
  ".best-ingredient-button-container"
);
$bestCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const ingredientId = cocktailButton.children[1].textContent;
  console.log(ingredientId);
  console.log("test");
  window.location.href = "./ingredientdetail.html?id=" + ingredientId;
});
