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

router.post('/default_board', (req, res) => {

	if(req.body.member_id !== 'admin'){
		res.json({result: false, error: "not admin"})
	}

	let datetime = new Date();
	let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
	// let snacks = ''
	// for (var i = 0; i < req.body.board_snack.length; i++){
	// 	if (i == req.body.board_snack.length - 1){
	// 		snacks = snacks + req.body.board_snack[i]
	// 	}else{
	// 		snacks = snacks + req.body.board_snack[i] + ', '
	// 	}
	// }
	// let tools = ''
	// for (var i = 0; i < req.body.board_tool.length; i++){
	// 	if(i == req.body.board_tool.length - 1){
	// 		tools = tools + req.body.board_tool[i]
	// 	}else{
	// 		tools = tools + req.body.board_tool[i] + ','
	// 	}
	// }

	con.query(`INSERT INTO \`Recipe\` (\`recipe_name\`, \`img_url\`) VALUE('${req.body.recipe_name}', '${req.body.recipeImg}')`, (err, result) => {})
	for (var i = 0; i < req.body.board_ingredient.length; i = i + 2){
		con.query(`INSERT INTO \`Recipe_Ingredient\` (\`recipe_name\`, \`ingredient\`, \`ratio\`) VALUE('${req.body.recipe_name}', '${req.body.board_ingredient[i]}', '${req.body.board_ingredient[i + 1]}')`, (err, result) => {})
		con.query(`INSERT INTO \`Ingredient\` (\`ingredient_name\`, \`count\`, \`ingredient_img_url\`) VALUE('${req.body.board_ingredient[i]}', 1, null) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1;`, (err, result) => {})
	}
	con.query(`INSERT INTO \`Default_Board\` (\`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUE('${req.body.recipe_name}', '${req.body.member_id}', '${write_time}', '${req.body.board_text}', '${req.body.board_snacks}', '${req.body.board_tool}');`, (err, result) =>{
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
	// let snacks = ''
	// let snack = req.body.board_snack.split(',');
	// for (var i = 0; i < snack.length; i++){
	// 	if (i == req.body.board_snack.length - 1){
	// 		snacks = snacks + req.body.board_snack[i]
	// 	}else{
	// 		snacks = snacks + req.body.board_snack[i] + ', '
	// 	}
	// }
	// let tools = ''
	// for (var i = 0; i < req.body.board_tool.length; i++){
	// 	if(i == req.body.board_tool.length - 1){
	// 		tools = tools + req.body.board_tool[i]
	// 	}else{
	// 		tools = tools + req.body.board_tool[i] + ','
	// 	}
	// }

	con.query(`INSERT INTO \`Recipe\` (\`recipe_name\`, \`img_url\`) VALUE('${req.body.recipe_name + '_' + req.body.member_id}', '${req.body.recipeImg}')`, (err, result) => {})
	for (var i = 0; i < req.body.board_ingredient.length; i = i + 2){
		con.query(`INSERT INTO \`Recipe_Ingredient\` (\`recipe_name\`, \`ingredient\`, \`ratio\`) VALUE('${req.body.recipe_name + '_' + req.body.member_id}', '${req.body.board_ingredient[i]}', '${req.body.board_ingredient[i + 1]}')`, (err, result) => {})
		con.query(`INSERT INTO \`Ingredient\` (\`ingredient_name\`, \`count\`, \`ingredient_img_url\`) VALUE('${req.body.board_ingredient[i]}', 1, null) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1;`, (err, result) => {})
	}
	con.query(`INSERT INTO \`My_Board\` (\`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUE('${req.body.recipe_name + '_' + req.body.member_id}', '${req.body.member_id}', '${write_time}', '${req.body.board_text}', '${req.body.board_snack}', '${req.body.board_tool}');`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		// res.json({result: false, error: err})
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
	con.query(`INSERT INTO \`My_Board_Comment\` (\`text\`, \`member_id\`, \`datetime\`, \`myboard_id\`) VALUE(${req.body.text}, ${req.body.member_id}, ${write_time}, ${req.body.board_id})`, (err, result) =>{
		if (err){
			res.json({result: false, error: err})
		}else{
			res.json({result: true})
		}
	}).catch((err) => {
		res.json({result: false, error: err})
	})
})

// 보류
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

router.post('/good_default_board', (req, res) => {
	con.query(`INSERT INTO \`DefaultBoard_Good\` (\`member_id\`, \`board_id\`) VALUE('${req.body.member_id}, ${req.body.board_id})`, (err, result) =>{})
	con.query(`UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_default_board_comment', (req, res) => {
	con.query(`INSERT INTO \`DefaultBoardComment_Good\` (\`member_id\`, \`board_id\`) VALUE('${req.body.member_id}, ${req.body.board_id})`, (err, result) =>{})
	con.query(`UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_comment_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_my_board', (req, res) => {
	con.query(`INSERT INTO \`MyBoard_Good\` (\`member_id\`, \`myboard_id\`) VALUE('${req.body.member_id}, ${req.body.board_id})`, (err, result) =>{})
	con.query(`UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`myboard_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_my_board_comment', (req, res) => {
	con.query(`INSERT INTO \`MyBoardComment_Good\` (\`member_id\`, \`myboard_comment_id\`) VALUE('${req.body.member_id}, ${req.body.board_id})`, (err, result) =>{})
	con.query(`UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`myboard_comment_id\` = ${req.body.board_id}`, (err, result) =>{})
})


router.post('/good_default_board_cancel', (req, res) => {
	con.query(`DELETE FROM \`DefaultBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_id\` = '${req.body.board_id}'`, (err, result) =>{})
	con.query(`UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_comment_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_default_board_comment_cancel', (req, res) => {
	con.query(`DELETE FROM \`DefaultBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_comment_id\` = '${req.body.board_id}'`, (err, result) =>{})
	con.query(`UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_my_board_cancel', (req, res) => {
	con.query(`DELETE FROM \`MyBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_id\` = '${req.body.board_id}'`, (err, result) =>{})
	con.query(`UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`myboard_id\` = ${req.body.board_id}`, (err, result) =>{})
})

router.post('/good_default_board_cancel', (req, res) => {
	con.query(`DELETE FROM \`MyBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_comment_id\` = '${req.body.board_id}'`, (err, result) =>{})
	con.query(`UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`myboard_comment_id\` = ${req.body.board_id}`, (err, result) =>{})
})

module.exports = router;
