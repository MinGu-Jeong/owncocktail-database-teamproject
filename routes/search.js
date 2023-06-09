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

router.post('/random', (req, res) => {
  let total
  con.query(`SELECT COUNT(*) AS total FROM \`Default_Board\``, (err, result) =>{
    if(err){
      console.log(err)
    }else{
      total = result[0].total
      console.log(total)
    }
  })
  const randomValue = Math.random()
  const id = Math.floor(randomValue * total) + 1
  con.query(`SELECT \`title\`, \`recipe_nam\`, \`member_id\`, \`write_time\`, \`text\`, \`good_cnt\`, \`snack\`, \`tool\` FROM \`Default_Board\` WHERE \`board_id\` = ${id}`, (err, result) => {
    res.json(result)
  })
})

router.post('/my_board', (req, res) => {
  con.query(`SELECT \`title\`, \`recipe_nam\`, \`member_id\`, \`write_time\`, \`text\`, \`good_cnt\`, \`snack\`, \`tool\` FROM \`My_Board\` WHERE \`board_id\` = ${req.body.board_id}`, (err, result) => {
    res.json(result)
  })
})

router.post('/default_board', (req, res) => {
  con.query(`SELECT \`title\`, \`recipe_nam\`, \`member_id\`, \`write_time\`, \`text\`, \`good_cnt\`, \`snack\`, \`tool\` FROM \`Default_Board\` WHERE \`board_id\` = ${req.body.board_id}`, (err, result) => {
    res.json(result)
  })
})

router.post('/ingredient_board', (req, res) => {
  con.query(`DISTINCT SELECT \`recipe_name\` FROM \`Recipe\` WHERE \`ingredient\` = '${req.body.name}'`, (err, result) =>{
    res.json(result)
  })
})

router.post('/popular_default_board', (req, res) => {
  con.query(`SELECT \`title\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`Default_Board\` ORDER BY \`good_cnt\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) => {
    res.json(result)
  })
})

router.post('/name_default_board', (res, req) => {
  con.query(`SELECT \`title\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`Default_Board\` ORDER BY \`title\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) => {
    res.json(result)
  })
})

router.post('/popular_my_board', (res, req) => {
  con.query(`SELECT \`title\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`My_Board\` ORDER BY \`good_cnt\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) => {
    res.json(result)
  })
})

router.post('/name_my_board', (res, req) => {
  con.query(`SELECT \`title\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`My_Board\` ORDER BY \`title\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) => {
    res.json(result)
  })
})

router.post('/popular_ingredient', (res, req) => {
  con.query(`SELECT \`name\` FROM \`ingredient\` ORDER BY \`count\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) =>{
    res.json(result)
  })
})

router.post('/name_ingredient', (res, req) => {
  con.query(`SELECT \`name\` FROM \`ingredient\` ORDER BY \`name\` LIMIT ${(req.body.page - 1) * req.body.num + 1}, ${req.body.num}`, (err, result) =>{
    res.json(result)
  })
})

router.post('/board_search', (req, res) => {
  let target = `%`
  for (const buf of req.body.search_target){
    target = `${target}${buf}%`
  }
  con.query(`SELECT \`title\`, \`good_cnt\`, \`board_id\` FROM \`Default_Board\` NATURAL JOIN \`My_Board\` WHERE \`title\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`, (err, result) =>{
    res.json(result)
  })
})

router.post('/my_board_search', (req, res) => {
  let target = `%`
  for (const buf of req.body.search_target){
    target = `${target}${buf}%`
  }
  con.query(`SELECT \`title\`, \`good_cnt\`, \`board_id\` FROM \`My_Board\` WHERE \`title\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`, (err, result) =>{
    res.json(result)
  })
})

router.post('/default_board_search', (req, res) => {
  let target = `%`
  for (const buf of req.body.search_target){
    target = `${target}${buf}%`
  }
  con.query(`SELECT \`title\`, \`good_cnt\`, \`board_id\` FROM \`Default_Board\` WHERE \`title\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`, (err, result) =>{
    res.json(result)
  })
})

module.exports = router;
