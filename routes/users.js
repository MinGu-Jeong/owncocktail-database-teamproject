var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "MyCocktail",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

router.get("/", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = \'${req.query.id}\'`,
    (err, result) => {
      res.json(result);
    }
  );
});

// 로그인 api
router.post("/login", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = '${req.body.id}'`,
    (err, result) => {
      if (result.length == 0 || result[0].passwd != req.body.passwd) {
        res.status(401);
        res.json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
      } else if (result[0].passwd == req.body.passwd) {
        res.json({
          message: "로그인 성공",
          user: {
            id: req.body.id,
            name: result[0].name,
            isLogin: true,
          },
        });
      }
    }
  );
});

// id중복 확인 api
router.post("/idCheck", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = \'${req.body.id}\'`,
    (err, result) => {
      if (result.length == 0) {
        res.json({ message: true }); // 아이디 사용 가능
      } else {
        res.json({ message: false }); // 아이디 사용 불가능
      }
    }
  );
});

// ID 삭제 api - 미완성
router.post("/deletemember", (req, res) => {
  con.query(
    `DELETE FROM \`member\` WHERE \`member_id\` = '${req.body.member_id}'`,
    // DELETE FROM \`My_Board\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`My_Board_Comment\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`My_Board_Good\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`My_Board_Comment_Good\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`Default_Board\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`Default_Board_Comment\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`Default_Board_Good\` WHERE \`member_id\` = '${req.body.member_id}'
    // DELETE FROM \`Default_Board_Comment_Good\` WHERE \`member_id\` = '${req.body.member_id}'

    (err, result) => {
      res.json({ result: true, id: req.body.member_id });
    }
  );
});

// 전화번호 중복 확인 api
router.post("/phoneCheck", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE tel = \'${req.body.tel}\'`,
    (err, result) => {
      if (result.length == 0) {
        res.json({ message: true });
      } else {
        res.json({ message: false });
      }
    }
  );
});

router.post("/email_check", (req, res) => {
  con.query(
    `SELECT COUNT(*) AS count FROM \`member\` WHERE \`email\` = '${req.body.email}'`,
    (err, result) => {
      if (err) throw err;
      if (result[0].count >= 1) {
        res.json({ result: false });
      } else {
        res.json({ result: true });
      }
    }
  );
});

// 회원가입(추가) api
router.post("/signup", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = \'${req.body.id}\' or tel = \'${req.body.phone}\';`,
    (err, result) => {
      if (result.length == 0) {
        con.query(
          `INSERT INTO member VALUES(\'${req.body.id}\', \'${req.body.name}\', \'${req.body.phone}\', \'${req.body.passwd}\', \'${req.body.birthdate}\', \'${req.body.email}\')`
        );
        res.json({ message: "가입 성공" });
      } else {
        res.status(400);
        if (result[0].tel === req.body.phone) {
          res.json({ message: "해당 전화번호로 등록된 계정이 있습니다." });
        } else if (result[0].member_id == req.body.id) {
          res.json({ message: "중복된 id입니다" });
        }
      }
    }
  );
});

// 마이페이지 정보 반환
router.post("/mypage_info", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = \'${req.body.member_id}\'`,
    (err, result) => {
      res.json(result);
    }
  );
});

//게시글 수 정보 반환
router.post("/myboard_count", (req, res) => {
  con.query(
    `SELECT COUNT(*) AS count FROM My_Board WHERE member_id = '${req.body.member_id}'`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

//댓글 수 정보 반환
router.post("/mycomment_count", (req, res) => {
  const member_id = req.body.member_id;

  con.query(
    `SELECT COUNT(*) AS count FROM My_Board_Comment WHERE member_id = '${member_id}'`,
    (err, result1) => {
      if (err) throw err;

      con.query(
        `SELECT COUNT(*) AS count FROM Default_Board_Comment WHERE member_id = '${member_id}'`,
        (err, result2) => {
          if (err) throw err;

          const total = result1[0].count + result2[0].count;
          res.json({ total_comments: total });
        }
      );
    }
  );
});

// 비밀번호 변경
router.post("/passwd_update", (req, res) => {
  con.query(
    `UPDATE \`member\` SET \`passwd\` = '${req.body.passwd}' WHERE \`member_id\` = '${req.body.member_id}'`,
    (err, result) => {
      res.json({ result: true });
    }
  );
});

// 이메일 변경
router.post("/email_update", (req, res) => {
  con.query(
    `UPDATE \`member\` SET \`email\` = \'${req.body.email}\' WHERE \`member_id\` = \'${req.body.member_id}\'`,
    (err, result) => {
      res.json({ result: true });
    }
  );
});

module.exports = router;
