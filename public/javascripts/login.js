const loginButton = document.getElementById("login-buuton");
loginButton.addEventListener("click", () => {
  const idValue = document.querySelector("#id").value;
  const pwValue = document.querySelector("#pw").value;
  if (idValue === "" || pwValue === "") {
    alert("id, pw를 입력해주세요");
  }

  const params = new URLSearchParams({
    id: idValue,
    pw: pwValue
  })

  fetch("/users?${params}")
  .then(response => response.json())
  .then(data => {
   // 받아온 사용자 목록을 처리하는 코드 작성
   // 테스트용 비번 맞는지 틀리는지 확인하는 코드
    // if(pwValue == data[0]['passwd']) { console.log("true"); }
    // else{
    //   console.log("false");
    // }
    // 검색 후 받아온 데이터 보는거
    console.log(data[0]);
  })
  .catch(error => {
    console.error(error);
  });
  
});

//타이틀 버튼 클릭시 홈 이동
const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

