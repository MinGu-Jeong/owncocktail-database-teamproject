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

const $check_phone_view = document.getElementsByClassName("phone-check-view")
$phoneNumber.addEventListener("keyup", (e) => {
  fetch('/users/phoneCheck', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      tel: $phoneNumber.value,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    if(data.message){
      console.log("전화번호 사용 가능!")
      // alert("아이디 사용 가능!")
      $check_phone_view[0].style.display = "none"
    }else{
      console.log("전화번호 사용 불가능!")
      // alert("아이디 사용 불가능!")
      $check_phone_view[0].style.display = "block"
    }
  })
  .catch((error) =>{
    console.log(error);
  });
})



const $testBox = document.getElementById("test-box");
const signupBTN =document.getElementById("signup-button");
signupBTN.addEventListener("click",()=>{

  const idval = decodeURIComponent(document.querySelector("#id").value);
  const pwval = decodeURIComponent(document.querySelector("#pw").value);
  const nameval = decodeURIComponent(document.querySelector("#name").value);
  const birthdateval = decodeURIComponent(
    document.querySelector("#birthdate").value
  );
  const emailval = decodeURIComponent(document.querySelector("#email").value);
  const phoneval = decodeURIComponent(
    document.querySelector("#phone-number").value
  );

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
    console.log(data)
    alert(data.message)
  })
  .catch(error => {
    console.error(error);
  });
  
})

const $idCheck = document.getElementById("id-check");
$idCheck.addEventListener("click", (e) => {
  e.preventDefault();
  const idVal = decodeURIComponent(document.querySelector("#id").value);
  fetch("/users/idCheck", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: idVal,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    if(data.message){
      console.log("아이디 사용 가능!")
      alert("아이디 사용 가능!")
    }else{
      console.log("아이디 사용 불가능!")
      alert("아이디 사용 불가능!")
    }
  })
  .catch((error) =>{
    console.log(error);
  });
});

const $check_id = document.getElementById("id");
const $check_id_view = document.getElementsByClassName("id-check-view")
$check_id.addEventListener("keyup", (e) =>{
  const idVal = decodeURIComponent(document.querySelector("#id").value);
  fetch("/users/idCheck", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: idVal,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    if(data.message){
      console.log("아이디 사용 가능!")
      $check_id_view[0].style.display = "none"
      // alert("아이디 사용 가능!")
    }else{
      console.log("아이디 사용 불가능!")
      $check_id_view[0].style.display = "block"
      // alert("아이디 사용 불가능!")
    }
  })
  .catch((error) =>{
    console.log(error);
  });
  
})