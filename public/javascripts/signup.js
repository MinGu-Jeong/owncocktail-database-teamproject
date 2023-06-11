// 로고 클릭 이벤트: index.html로 이동
const $titleLogo = document.querySelector(".title-logo");
$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// 로그인 버튼 클릭 이벤트: login.html로 이동
const $loginButtonTop = document.querySelector("#login-button-top");
$loginButtonTop.addEventListener("click", () => {
  window.location.href = "./login.html";
});

// 회원가입 버튼 클릭 이벤트: signup.html로 이동
const $signupButtonTop = document.querySelector("#signup-button-top");
$signupButtonTop.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
const $id = document.getElementById("id");
const $idCheck = document.getElementById("id-check");

// 비밀번호 입력, 비번 일치 확인
const $pw = document.getElementById("pw");
const $pwCheckView = document.getElementsByClassName("pw-check-view");
const $signupButton = document.getElementById("signup-button");
const $pwCheck = document.getElementById("pw-check");
const $email = document.getElementById("email");
const $check_email_view = document.getElementsByClassName("email-check-view");

// 비밀번호 일치 확인
$pwCheck.addEventListener("blur", () => {
  if ($pw.value !== $pwCheck.value) {
    $pwCheckView[0].style.display = "block";
    if (
      $check_id_view[0].style.display == "block" ||
      $check_phone_view[0].style.display == "block" ||
      $pwCheckView[0].style.display == "block" ||
      $check_email_view[0].style.display == "block"
    ) {
      $signupButton.disabled = true;
    }
  } else {
    $pwCheckView[0].style.display = "none";
    if (
      ($check_id_view[0].style.display == "none" ||
        $check_id_view[0].style.display == "") &&
      ($check_phone_view[0].style.display == "none" ||
        $check_phone_view[0].style.display == "") &&
      ($pwCheckView[0].style.display == "none" ||
        $pwCheckView[0].style.display == "") &&
      ($check_email_view[0].style.display == "none" ||
        $check_email_view[0].style.display == "")
    ) {
      $signupButton.disabled = false;
    }
  }
});

//엔터키 눌러도 제출 안되게 방지
document.addEventListener(
  "keydown",
  (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  },
  true
);

// 전화번호 입력
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

// 전화번호 중복 확인
const $check_phone_view = document.getElementsByClassName("phone-check-view");
$phoneNumber.addEventListener("keyup", (e) => {
  fetch("/users/phoneCheck", {
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
      console.log(data.message);
      if (data.message) {
        console.log("전화번호 사용 가능!");
        // alert("아이디 사용 가능!")
        $check_phone_view[0].style.display = "none";
        if (
          $check_id_view[0].style.display == "none" &&
          $check_phone_view[0].style.display == "none" &&
          $pwCheckView[0].style.display == "none"
        ) {
          $signupButton.disabled = false;
        }
      } else {
        console.log("전화번호 사용 불가능!");
        // alert("아이디 사용 불가능!")
        $check_phone_view[0].style.display = "block";
        if (
          $check_id_view[0].style.display == "block" ||
          $check_phone_view[0].style.display == "block" ||
          $pwCheckView[0].style.display == "block"
        ) {
          $signupButton.disabled = true;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
//이메일 중복 확인 및 이메일 형식 확인(@필수)
$email.addEventListener("keyup", (e) => {
  fetch("/users/email_check", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: $email.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result == true) {
        // console.log("이메일 사용 가능!");
        $check_email_view[0].style.display = "none";
        if (
          $check_email_view[0].style.display == "none" &&
          $check_id_view[0].style.display == "none" &&
          $check_phone_view[0].style.display == "none" &&
          $pwCheckView[0].style.display == "none"
        ) {
          $signupButton.disabled = false;
        }
      } else {
        // console.log("이메일 사용 불가능!");
        $check_email_view[0].style.display = "block";
        if (
          $check_id_view[0].style.display == "block" ||
          $check_phone_view[0].style.display == "block" ||
          $pwCheckView[0].style.display == "block" ||
          $check_email_view[0].style.display == "block"
        ) {
          $signupButton.disabled = true;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// 회원가입 버튼 클릭 이벤트: 회원가입 api호출
const signupBTN = document.getElementById("signup-button");
signupBTN.addEventListener("click", () => {
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

  fetch("/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: idval,
      passwd: pwval,
      name: nameval,
      birthdate: birthdateval,
      email: emailval,
      phone: phoneval,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/login.html";
      alert(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
});

// 아이디 중복 확인 이벤트: 아이디 중복 체크
const $check_id_view = document.getElementsByClassName("id-check-view");
$id.addEventListener("keyup", (e) => {
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
      console.log(data.message);
      if (data.message) {
        console.log("아이디 사용 가능!");
        $check_id_view[0].style.display = "none";
        if (
          ($check_id_view[0].style.display == "none" ||
            $check_id_view[0].style.display == "") &&
          ($check_phone_view[0].style.display == "none" ||
            $check_phone_view[0].style.display == "") &&
          ($pwCheckView[0].style.display == "none" ||
            $pwCheckView[0].style.display == "") &&
          ($check_email_view[0].style.display == "none" ||
            $check_email_view[0].style.display == "")
        ) {
          $signupButton.disabled = false;
        }
        // alert("아이디 사용 가능!")
      } else {
        console.log("아이디 사용 불가능!");
        $check_id_view[0].style.display = "block";
        if (
          $check_id_view[0].style.display == "block" ||
          $check_phone_view[0].style.display == "block" ||
          $pwCheckView[0].style.display == "block" ||
          $check_email_view[0].style.display == "block"
        ) {
          $signupButton.disabled = true;
        }
        // alert("아이디 사용 불가능!")
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
