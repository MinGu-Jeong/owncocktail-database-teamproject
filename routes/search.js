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

router.post("/random_default", (req, res) => {
  let total;
  con.query(
    `SELECT COUNT(*) AS total FROM \`Default_Board\``,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        total = result[0].total;
        const randomValue = Math.random();
        const id = Math.floor(randomValue * total) + 1;
        res.json({ result: id });
      }
    }
  );
});

router.post("/random_my", (req, res) => {
  let total;
  con.query(`SELECT COUNT(*) AS total FROM \`My_Board\``, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      total = result[0].total;
      const randomValue = Math.random();
      const id = Math.floor(randomValue * total) + 1;
      res.json({ result: id });
    }
  });
});

router.post("/search_recipe", (req, res) => {
  let recipe_name;
  con.query(
    `SELECT \`recipe_name\` FROM \`Default_Board\` WHERE \`board_id\` = ${req.body.board_id}`,
    (err, result) => {
      recipe_name = result[0].recipe_name;
      con.query(
        `SELECT i.ingredient_name, ri.ratio, i.ingredient_img_url FROM (Recipe_Ingredient ri JOIN Ingredient i ON ri.ingredient = i.ingredient_name) WHERE ri.recipe_name = '${recipe_name}';`,
        (err, result) => {
          res.json(result);
        }
      );
    }
  );
});

router.post("/my_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`good_cnt\`, \`snack\`, \`tool\` FROM \`My_Board\` WHERE \`myboard_id\` = ${req.body.board_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/default_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`good_cnt\`, \`snack\`, \`tool\` FROM \`Default_Board\` WHERE \`board_id\` = ${req.body.board_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/ingredient_board", (req, res) => {
  con.query(
    `DISTINCT SELECT \`recipe_name\` FROM \`Recipe\` WHERE \`ingredient\` = '${req.body.name}'`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/popular_default_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`Default_Board\` ORDER BY \`good_cnt\` DESC LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/name_default_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`board_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`Default_Board\` ORDER BY \`recipe_name\` LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/popular_my_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`myboard_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`My_Board\` ORDER BY \`good_cnt\` DESC LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/name_my_board", (req, res) => {
  con.query(
    `SELECT \`recipe_name\`, \`myboard_id\`, \`member_id\`, \`write_time\`, \`good_cnt\` FROM \`My_Board\` ORDER BY \`recipe_name\`LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/popular_ingredient", (req, res) => {
  con.query(
    `SELECT \`ingredient_name\` FROM \`Ingredient\` ORDER BY \`count\` DESC LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/name_ingredient", (req, res) => {
  con.query(
    `SELECT \`ingredient_name\` FROM \`Ingredient\` ORDER BY \`ingredient_name\` LIMIT ${
      (req.body.page - 1) * req.body.num
    }, ${req.body.num}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/board_search", (req, res) => {
  let target = `%`;
  for (const buf of req.body.search_target) {
    target = `${target}${buf}%`;
  }
  con.query(
    `SELECT recipe_name, member_id, board_id, myboard_id, write_time, text, good_cnt, snack, tool
    FROM (
      SELECT recipe_name, member_id, board_id, NULL AS myboard_id, write_time, text, good_cnt, snack, tool
      FROM Default_Board
      UNION ALL
      SELECT recipe_name, member_id, NULL AS board_id, myboard_id, write_time, text, good_cnt, snack, tool
      FROM My_Board
    ) AS combined_boards    
    WHERE recipe_name LIKE '${target}'`,
    (err, result) => {
      res.json(result);
    }
  );
});

//myboard 게시글 수 정보 반환
router.post("/myboard_count", (req, res) => {
  con.query(`SELECT COUNT(*) AS count FROM My_Board`, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/my_board_search", (req, res) => {
  let target = `%`;
  for (const buf of req.body.search_target) {
    target = `${target}${buf}%`;
  }
  con.query(
    `SELECT \`recipe_name\`, \`good_cnt\`, \`myboard_id\` FROM \`My_Board\` WHERE \`recipe_name\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`,
    (err, result) => {
      res.json(result);
    }
  );
});

//default_board 게시글 수 정보 반환
router.post("/default_board_count", (req, res) => {
  con.query(
    `SELECT MAX(board_id) AS max_id FROM default_board`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.post("/default_board_search", (req, res) => {
  let target = `%`;
  for (const buf of req.body.search_target) {
    target = `${target}${buf}%`;
  }
  con.query(
    `SELECT \`recipe_name\`, \`good_cnt\`, \`board_id\` FROM \`Default_Board\` WHERE \`recipe_name\` LIKE \'${target}\' OR \`text\` LIKE \'${target}\'`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/default_comment", (req, res) => {
  con.query(
    `SELECT * FROM \`Default_Board_Comment\` WHERE \`board_id\` = ${req.body.board_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/my_comment", (req, res) => {
  con.query(
    `SELECT * FROM \`MY_Board_Comment\` WHERE \`myboard_id\` = ${req.body.myboard_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;
