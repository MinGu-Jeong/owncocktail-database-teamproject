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
