var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', (req, res) => {

  con.query("SELECT * FROM member", (err, result) =>{
    if(err){
      reject(err);
      return;
    }
    res.json(result)
  })
})

module.exports = router;
