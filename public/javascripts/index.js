const $titleLogo = document.querySelector(".title-logo");

$titleLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// HTML 파일이 로드된 후 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
  // 버튼 요소 선택
  var myButton = document.getElementById('getUsersButton');

  // 버튼 클릭 이벤트 처리
  myButton.addEventListener('click', function() {
    // 클릭 이벤트 발생 시 실행되는 코드

    fetch('/users')
    .then(response => response.json())
    .then(data => {
    // 받아온 사용자 목록을 처리하는 코드 작성
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

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

  });
});
