function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("active");
}

function changeSort(sortType) {
  // 선택된 정렬 방식에 따라 필요한 작업 수행
  if (sortType === "popular") {
    // 인기순 정렬 처리
    // ...
  } else if (sortType === "name") {
    // 이름순 정렬 처리
    // ...
  } else if (sortType === "comment") {
    // 댓글순 정렬 처리
    // ...
  }

  // 드롭다운 숨기기
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.remove("active");
}
