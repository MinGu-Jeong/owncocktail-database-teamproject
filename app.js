var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

const usersRouter = require('./routers/users');
// const productsRouter = require('./routers/products');
app.use('/users', usersRouter);
// app.use('/products', productsRouter);

// 엔드포인트 설정
// 아마 fetch에서 배개변수 넘겨주면 req에 들어가는듯?
// -> "req.query.변수이름"으로 접근 가능 -> 파이썬의 딕셔너리처럼 인덱스 번호 접근이 아니라 변수 이름으로!!
// C++에서는 아마 해시맵? 일듯?
// app.get('/users', (req, res) => {

//   con.query("SELECT * FROM member", (err, result) =>{
//     if(err){
//       reject(err);
//       return;
//     }
//     res.json(result)
//   })
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/', function(req, res){
  res.render('index.html')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;