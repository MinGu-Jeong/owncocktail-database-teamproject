const loginButton = document.getElementById("login-buuton");
loginButton.addEventListener("click", () => {
  const idValue = document.querySelector("#id").value;
  const pwValue = document.querySelector("#pw").value;
  if (idValue === "" || pwValue === "") {
    alert("id, pw를 입력해주세요");
  }
});

//타이틀 버튼 클릭시 홈 이동
const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
