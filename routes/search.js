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

router.post('/', (req, res) => {
  
})

router.post('/recipe_search', (req, res) => {
  let target = `%`
  for (const buf of req.body.search_target){
    target = `${target}${buf}%`
  }
  con.query(`SELECT \`title\`, \`good_cnt\`, \`board_id\` FROM \`Default_Board\` NATURAL JOIN \`My_Board\` WHERE \`title\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`, (err, result) =>{
    res.json(result)
  })
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {
  
})

// con.query(`SELECT \`title\`, \`good_cnt\` FROM \`Default_Board\` JOIN \`My_Board\``, (err, result) =>{
//     console.log(result);
// })

// const test = "조병하"
// let t = '%'
// for (const buf of test){
//   t = `${t}${buf}%`
// }
// console.log(t)
// con.query(`SELECT * FROM \`member\` WHERE \`member_name\` LIKE \'${test}\';`, (err, result) => {
//   console.log(result)
// })

module.exports = router;
