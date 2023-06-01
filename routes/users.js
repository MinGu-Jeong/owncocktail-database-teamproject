var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  con.query(
    `SELECT * FROM member WHERE member_id = ${req.params.id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/", (req, res) => {
  con.query(
    `INSERT INTO member VALUES(\'${req.body.name}\', \'${req.body.phone}\', \'${req.body.id}\', \'${req.body.passwd}\', \'${req.body.birthdate}\', \'${req.body.email}\')`
  );
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
