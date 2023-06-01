const $titleLogo = document.querySelector(".title-logo");
$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

const $loginButtonTop = document.querySelector("#login-button-top");
$loginButtonTop.addEventListener("click", () => {
  window.location.href = "./login.html";
});

const $signupButtonTop = document.querySelector("#signup-button-top");
$signupButtonTop.addEventListener("click", () => {
  window.location.href = "./signup.html";
});

const loginButton = document.getElementById("login-buuton");
loginButton.addEventListener("click", () => {
  const idValue = document.querySelector("#id").value;
  const pwValue = document.querySelector("#pw").value;
  if (idValue === "" || pwValue === "") {
    alert("id, pw를 입력해주세요");
  }

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

  const params = new URLSearchParams({
    id: idValue,
    pw: pwValue,
  });

  fetch(`/users?${params}`)
    .then((response) => response.json())
    .then((data) => {
      // 받아온 사용자 목록을 처리하는 코드 작성
      // 테스트용 비번 맞는지 틀리는지 확인하는 코드
      // if(pwValue == data[0]['passwd']) { console.log("true"); }
      // else{
      //   console.log("false");
      // }
      // 검색 후 받아온 데이터 보는거
      console.log(data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});
