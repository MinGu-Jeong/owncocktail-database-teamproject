const $cancel = document.querySelector(".btn-outline-danger");
$cancel.addEventListener("click", () => {
  location.href = "login.html";
});

const $id = document.getElementById("id");
const $idCheckView = document.getElementsByClassName("id-check-view");

const $pw = document.getElementById("pw");
const $pwCheckView = document.getElementsByClassName("pw-check-view");
const $pwCheck = document.getElementById("pw-check");
$pwCheck.addEventListener("blur", () => {
  if ($pw.value !== $pwCheck.value) {
    $pwCheckView[0].style.display = "block";
  } else {
    $pwCheckView[0].style.display = "none";
  }
});

document.addEventListener(
  "keydown",
  (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  },
  true
);

const $phoneNumber = document.getElementById("phone-number");
$phoneNumber.addEventListener("keydown", (e) => {
  if (e.key != "Backspace") {
    if ($phoneNumber.value.length == 3) {
      $phoneNumber.value += "-";
    } else if ($phoneNumber.value[2] == "0" && $phoneNumber.value.length == 8) {
      $phoneNumber.value += "-";
    } else if ($phoneNumber.value[2] != "0" && $phoneNumber.value.length == 7) {
      $phoneNumber.value += "-";
    } else if ($phoneNumber.value[1] == "2" && $phoneNumber.value.length == 2) {
      $phoneNumber.value += "-";
    } else if ($phoneNumber.value[1] == "2" && $phoneNumber.value.length == 6) {
      $phoneNumber.value += "-";
    } else if (
      $phoneNumber.value[1] != "1" &&
      $phoneNumber.value[1] != "2" &&
      $phoneNumber.value.length == 3
    ) {
      $phoneNumber.value += "-";
    } else if (
      $phoneNumber.value[1] != "2" &&
      $phoneNumber.value[1] != "1" &&
      $phoneNumber.value.length == 7
    ) {
      $phoneNumber.value += "-";
    }
  }
});

//타이틀 버튼 클릭시 홈 이동
const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});



const $testBox = document.getElementById("test-box");
const signupBTN =document.getElementById("signup-button");
signupBTN.addEventListener("click",(e)=>{
  e.preventDefault();
  const idval = decodeURIComponent(document.querySelector("#id").value);
  const pwval = decodeURIComponent(document.querySelector("#pw").value);
  const nameval = decodeURIComponent(document.querySelector("#name").value);
  const birthdateval = decodeURIComponent(document.querySelector("#birthdate").value);
  const emailval = decodeURIComponent(document.querySelector("#email").value);
  const phoneval = decodeURIComponent(document.querySelector("#phone-number").value);

  fetch('/users', {
    method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: idval,
    passwd: pwval,
    name: nameval,
    birthdate: birthdateval,
    email: emailval,
    phone: phoneval
  })})
  .then(response => response.json())
  .then(data => {
   // 받아온 사용자 목록을 처리하는 코드 작성
   // 테스트용 비번 맞는지 틀리는지 확인하는 코드
    // if(pwValue == data[0]['passwd']) { console.log("true"); }
    // else{
    //   console.log("false");
    // }
    // 검색 후 받아온 데이터 보는거
    alert(data.message)
    if(data.message == '가입 성공'){
      location.href = "login.html";
    }
  })
  .catch(error => {
    console.error(error);
  });
  
})



