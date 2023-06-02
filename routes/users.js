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
  con.query(`SELECT * FROM member WHERE member_id = \'${req.query.id}\'`, (err, result) =>{
    res.json(result)
  })
})

// 로그인 api
router.post('/login', (req, res) =>{
  con.query(`SELECT * FROM member WHERE member_id = \'${req.body.id}\'`, (err, result) =>{
    if(result.length == 0 || result[0].passwd != req.body.passwd){
      res.status(401);
      res.json({message:'아이디 또는 비밀번호가 틀렸습니다.'})
    }else if(result[0].passwd == req.body.passwd){
      res.json({message:'로그인 성공'})
    }
  })
})

// id중복 확인 api
router.post('/idCheck', (req, res) => {
  con.query(`SELECT * FROM member WHERE member_id = \'${req.body.id}\'`, (err, result) =>{
    if(result.length == 0){
      res.json({message: true}) // 아이디 사용 가능
    }else{
      res.json({message: false}) // 아이디 사용 불가능
    }
  })
})

// 전화번호 중복 확인 api
router.post('/phoneCheck', (req, res) => {
  con.query(`SELECT * FROM member WHERE tel = \'${req.body.tel}\'`, (err, result) =>{
    if(result.length == 0){
      res.json({message: true})
    }else{
      res.json({message: false})
    }
  })
})

// 회원가입(추가) api
router.post('/', (req, res) => {
  con.query(`SELECT * FROM member WHERE member_id = \'${req.body.id}\' or tel = \'${req.body.phone}\';`, (err, result) =>{
    if (result.length == 0){
      con.query(`INSERT INTO member VALUES(\'${req.body.name}\', \'${req.body.phone}\', \'${req.body.id}\', \'${req.body.passwd}\', \'${req.body.birthdate}\', \'${req.body.email}\')`)
      res.json({message:'가입 성공'})
    }else{
      res.status(400);
      if (result[0].tel === req.body.phone){
        res.json({message: '해당 전화번호로 등록된 계정이 있습니다.'})
      }else if(result[0].member_id == req.body.id){
        res.json({message: '중복된 id입니다'});
      }
    }
  })
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {
  
})

// con.query(`SELECT * FROM member WHERE member_id = \'whqudgk\'`, (err, result) =>{
//   console.log(result[0].passwd)
// })

module.exports = router;