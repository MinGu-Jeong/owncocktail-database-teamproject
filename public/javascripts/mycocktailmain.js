const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");
const $mycocktailmain = document.getElementById("nav-own-cocktail");
const $titleLogo = document.querySelector(".title-logo");
const $newReceipeButton = document.getElementById("writeBTN");
$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
$loginButton.addEventListener("click", () => {
  s;
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
$newReceipeButton.addEventListener("click", () => {
  window.location.href = "./new-receipe.html";
});
var pageCount = 1;
var allPage = 20;
const options = document.getElementsByClassName("option");
window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const $pagetext = document.querySelector("#page-text");
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
  document.querySelector(".dropbtn_click").onclick = () => {
    dropdown();
  };
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = () => {
      showMenu(options[i].innerText);
    };
  }
  draw("popular", pageCount);
  // myboard 게시글 수 카운트
  fetch("/search/myboard_count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      allPage = Math.ceil(data[0].count / 8);
      console.log(data[0].count);
      const maxId = data[0].count || 0; // 만약 게시글이 없다면 0을 기본값으로 사용
      $pageText.textContent = `1 / ${Math.floor(maxId / 8)}`; // 가장 큰 게시글 번호를 페이지 텍스트로 설정
    })
    .catch((error) => {
      console.error;
    });
};
function dropdown() {
  var v = document.querySelector(".dropdown-content");
  var dropbtn = document.querySelector(".dropbtn");
  v.classList.toggle("show");
  dropbtn.style.borderColor = "rgb(94, 94, 94)";
}

function draw(path, thispage) {
  fetch(`/search/${path}_my_board`, {
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
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const cocktailNameElement = document.querySelector(
          `#owncocktail-name${i + 1}`
        );
        const cocktailIdElement = document.querySelector(
          `#owncocktail-id${i + 1}`
        );
        const cocktailIMGElement = document.querySelector(
          `#my-image-id${i + 1}`
        );
        cocktailNameElement.textContent = data[i].recipe_name;
        cocktailIdElement.textContent = data[i].myboard_id;
        findIMG(cocktailIMGElement, cocktailNameElement);
      }
      if (data.length < 8) {
        for (let i = data.length; i < 8; i++) {
          cocktailNameElements[i].textContent = "로딩중";
          cocktailIdElements[i].textContent = "로딩중";
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMenu(value) {
  dropbtn_content.innerText = value;
  dropbtn_content.style.color = "#252525";
  dropbtn.style.borderColor = "#3992a8";
  changeSort(value, pageCount);
}
function changeSort(sortType, thispage) {
  // 선택된 정렬 방식에 따라 필요한 작업 수행
  if (sortType === "인기순") {
    draw("popular", thispage);
  } else if (sortType === "이름순") {
    draw("name", thispage);
  }
}
var dropbtn_icon = document.querySelector(".dropbtn_icon");
var dropbtn_content = document.querySelector(".dropbtn_content");
var dropbtn_click = document.querySelector(".dropbtn_click");
var dropbtn = document.querySelector(".dropbtn");

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

const $pageText = document.getElementById("page-text");
const $pageLeftButton = document.getElementById("left-button");
const $pageRightButton = document.getElementById("right-button");

$pageLeftButton.addEventListener("click", () => {
  if (pageCount > 1) {
    pageCount -= 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
    changeSort(dropbtn_content.innerText, pageCount);
  }
});
$pageRightButton.addEventListener("click", () => {
  console.log(`${pageCount},${allPage}`);
  if (pageCount < allPage) {
    pageCount += 1;
    $pageText.innerText = `${pageCount} / ${allPage}`;
    changeSort(dropbtn_content.innerText, pageCount);
  }
});

const $randomButton = document.getElementById("random-button");
$randomButton.addEventListener("click", () => {
  fetch("/search/random_my", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "./cocktail.html?id=" + data.result + "&type=own";
    })
    .catch((error) => {
      console.log(error);
    });
});
const $bestCocktailButtonContainer = document.querySelector(
  ".best-cocktail-button-container"
);
$bestCocktailButtonContainer.addEventListener("click", (event) => {
  const cocktailButton = event.target.closest("button");
  if (!cocktailButton) return;
  const cocktailId = cocktailButton.children[2].textContent;
  console.log("cocktailtest");
  console.log(cocktailId);
  window.location.href = "./cocktail.html?id=" + cocktailId + "&type=own";
});

function findIMG(recipe_IMG, recipe) {
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
        if (data.recipe_name == recipe.textContent) {
          recipe_IMG.src = data.img_url;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
