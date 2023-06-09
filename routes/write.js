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

router.post('/default_board', (req, res) => {

	if(req.body.member_id !== 'admin'){
		res.json({result: false, error: "not admin"})
	}

	let datetime = new Date();
	let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
	let snacks = ''
	for (var i = 0; i < req.body.board_snack.length; i++){
		if (i == req.body.board_snack.length - 1){
			snacks = snacks + req.body.board_snack[i]
		}else{
			snacks = snacks + req.body.board_snack[i] + ', '
		}
	}
	let tools = ''
	for (var i = 0; i < req.body.board_tool.length; i++){
		if(i == req.body.board_tool.length - 1){
			tools = tools + req.body.board_tool[i]
		}else{
			tools = tools + req.body.board_tool[i] + ','
		}
	}
	let insert_recipe = ''
	let ingredient_cnt = ''
	for (var i = 0; i < req.body.board_ingredient.length; i++){
		insert_recipe = insert_recipe + `INSERT INTO \`Recipe\` (\`recipe_name\`, \`ingredient\`, \`ratio\`, \`img_url\`, \`ingredient_img_url\`) VALUE(${req.body.title + '_' + req.body.member_id}, ${req.body.board_ingredient[i][0]}, ${req.body.board_ingredient[i][1]}, ${req.body.board_recipeImg}, ${req.body.board_ingredient[i][2]})\n`
		ingredient_cnt = ingredient_cnt + `INSERT INTO \`ingredient\` (\`name\`, \`count\`) VALUE(${req.body.board_ingredient[i][0]}, 1) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1\n`
	}
	con.query(`INSERT INTO \`Default_Board\` (\`title\`, \`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUE(${req.body.board_title}, ${req.body.title + '_' + req.body.member_id}, ${req.body.member_id}, ${write_time}, ${req.body.board_text}, ${snacks}, ${tools})
	${insert_recipe}
	${ingredient_cnt}`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
  
})

router.post('/my_board', (req, res) =>{

	let datetime = new Date();
	let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
	let snacks = ''
	for (var i = 0; i < req.body.board_snack.length; i++){
		if (i == req.body.board_snack.length - 1){
			snacks = snacks + req.body.board_snack[i]
		}else{
			snacks = snacks + req.body.board_snack[i] + ', '
		}
	}
	let tools = ''
	for (var i = 0; i < req.body.board_tool.length; i++){
		if(i == req.body.board_tool.length - 1){
			tools = tools + req.body.board_tool[i]
		}else{
			tools = tools + req.body.board_tool[i] + ','
		}
	}
	let insert_recipe = ''
	let ingredient_cnt = ''
	for (var i = 0; i < req.body.board_ingredient.length; i++){
		insert_recipe = insert_recipe + `INSERT INTO \`Recipe\` (\`recipe_name\`, \`ingredient\`, \`ratio\`, \`img_url\`, \`ingredient_img_url\`) VALUE(${req.body.title + '_' + req.body.member_id}, ${req.body.board_ingredient[i][0]}, ${req.body.board_ingredient[i][1]}, ${req.body.board_recipeImg}, ${req.body.board_ingredient[i][2]})\n`
		ingredient_cnt = ingredient_cnt + `INSERT INTO \`ingredient\` (\`name\`, \`count\`) VALUE(${req.body.board_ingredient[i][0]}, 1) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1\n`
	}
	con.query(`INSERT INTO \`My_Board\` (\`title\`, \`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUE(${req.body.board_title}, ${req.body.title + '_' + req.body.member_id}, ${req.body.member_id}, ${write_time}, ${req.body.board_text}, ${snacks}, ${tools})
	${insert_recipe}
	${ingredient_cnt}`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
  
})

router.post('/default_comment', (req, res) =>{
	let datetime = new Date();
	let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
	con.query(`INSERT INTO \`Default_Board_Comment\` (\`text\`, \`member_id\`, \`datetime\`, \`board_id\`) VALUE(${req.body.text}, ${req.body.member_id}, ${write_time}, ${req.body.board_id})`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
})

router.post('/my_comment', (req, res) => {
	let datetime = new Date();
	let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
	con.query(`INSERT INTO \`My_Board_Comment\` (\`text\`, \`member_id\`, \`datetime\`, \`board_id\`) VALUE(${req.body.text}, ${req.body.member_id}, ${write_time}, ${req.body.board_id})`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
})

router.post('/default_delete', (req, res) => {
	con.query(`DELETE FROM \`Default_Board\` WHERE \`member_id\` = '${req.member_id} AND \`board_id\` = ${req.body.board_id}
	DELETE FROM \`Default_Board_Comment\` WHERE \`board_id\` = ${req.body.board_id}
	UPDATE \`ingredient\` SET \`count\` = \`count\` - 1 WHERE \`name\` IN (SELECT \`ingredient\` FROM \`Recipe\` WHERE \`recipe_name\` = ${req.body.board_title + '_' + req.body.member_id})
	DELETE FROM \`Recipe\` WHERE \`recipe_name\` = ${req.body.board_title + '_' + req.body.member_id}`, (err, result) =>{
		if(err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
})

router.post('/my_delete', (req, res) => {
	con.query(`DELETE FROM \`My_Board\` WHERE \`member_id\` = '${req.member_id} AND \`board_id\` = ${req.body.board_id}
	DELETE FROM \`My_Board_Comment\` WHERE \`board_id\` = ${req.body.board_id}
	UPDATE \`ingredient\` SET \`count\` = \`count\` - 1 WHERE \`name\` IN (SELECT \`ingredient\` FROM \`Recipe\` WHERE \`recipe_name\` = ${req.body.board_title + '_' + req.body.member_id})
	DELETE FROM \`Recipe\` WHERE \`recipe_name\` = ${req.body.board_title + '_' + req.body.member_id}`, (err, result) =>{
		if(err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
})

router.post('/good', (req, res) =>{
	con.query(`INSERT INTO \`Good_Check\` (\`member_id\`, \`target_id\`, \`target_type\`) VALUE('${req.body.member_id}', ${req.body.target_id}, ${req.body.target_type})`, (err, result) => {})
	if (req.body.target_type === 'Default_Board'){
		con.query(`UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_id\` = ${req.body.target_id}`, (err, result) => {})
	}else if(req.body.target_type === 'Default_Board_Comment'){
		con.query(`UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`comment_id\` = ${req.body.target_id}`, (err, result) => {})
	}else if (req.body.target_type === 'My_Board'){
		con.query(`UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_id\` = ${req.body.target_id}`, (err, result) => {})
	}else if(req.body.target_type === 'My_Board_Comment'){
		con.query(`UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`comment_id\` = ${req.body.target_id}`, (err, result) => {})
	}
})

router.post('/good_cancel', (req, res) =>{

	let check_good
	con.query(`SELECT COUNT(*) AS cnt FROM \`Good_Check\` WHERE \`member_id\` = ${req.body.member_id} AND \`target_id\` = ${req.body.target_id} AND \`target_type\` = ${req.body.target_type}`, (err, result) => {
		check_good = result[0].cnt
	})
	if (check_good == 0){
		res.json({result: false})
	}else{
		if (req.body.target_type === 'Default_Board'){
			con.query(`UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_id\` = ${req.body.target_id}`, (err, result) => {})
		}else if(req.body.target_type === 'Default_Board_Comment'){
			con.query(`UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`comment_id\` = ${req.body.target_id}`, (err, result) => {})
		}else if (req.body.target_type === 'My_Board'){
			con.query(`UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_id\` = ${req.body.target_id}`, (err, result) => {})
		}else if(req.body.target_type === 'My_Board_Comment'){
			con.query(`UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`comment_id\` = ${req.body.target_id}`, (err, result) => {})
		}
		con.query(`DELETE FROM \`Good_Check\` WHERE \`member_id\` = '${req.body.member_id}' AND \`target_id\` = '${req.body.target_id}' AND \`target_type\` = '${req.body.target_type}'`, (err, result) => {
			res.json({result: true})
		})
	}

})

module.exports = router;
