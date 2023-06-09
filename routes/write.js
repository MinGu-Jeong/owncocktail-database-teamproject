var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '1234',
  database: 'MyCocktail'
})

con.connect(function(err){
  if(err) throw err;
  console.log('Connected');
})

// 엔드포인트 설정
// 아마 fetch에서 배개변수 넘겨주면 req에 들어가는듯?
// -> "req.query.변수이름"으로 접근 가능 -> 파이썬의 딕셔너리처럼 인덱스 번호 접근이 아니라 변수 이름으로!!
// C++에서는 아마 해시맵? 일듯?
 
/* GET users listing. */
router.get('/', (req, res) => {
    
})

router.post('/default', (req, res) => {
  
})

/*
body: JSON.stringify({
	board_title: "게시글 제목",
	member_id: "게시글 작성자 아이디",
	board_write_time: "게시글 작성 시간",
	board_img_url: {"이미지 이름(재료종류 ex: base, garnish, ... 등등)": "게시글 이미지 url", ....},
	board_text: "게시글 내용",
	board_snack: ["안주1", "안주2", ...],
	tool: ["사용도구1", "사용도구2", ...],
	base: "이름\n용량"
	garnish: ["이름1", "이름2", ...]
	beveridge: "이름\n용량"
	syrup: "이름\n용량"	
})
*/

router.post('/my', (req, res) => {
    con.query(`
    `, (err, result) => {
        console.log(result);
    })
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {
  
})

// const test = "민서형이\n원하는것"
// console.log(test)
// let result_test = test.split("\n")
// console.log(result_test)

module.exports = router;
