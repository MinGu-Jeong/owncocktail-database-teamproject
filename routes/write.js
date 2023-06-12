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

router.post("/default_board", (req, res) => {
  if (req.body.member_id !== "admin") {
    res.json({ result: false, error: "not admin" });
    return;
  }

  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1).toString().padStart(2, "0"); // 월 값은 0부터 시작하므로 1을 더하고, 2자리로 표시하도록 패딩을 추가합니다.
  let day = datetime.getDate().toString().padStart(2, "0"); // 일(day) 값을 가져오고, 2자리로 표시하도록 패딩을 추가합니다.
  let hours = datetime.getHours().toString().padStart(2, "0");
  let minutes = datetime.getMinutes().toString().padStart(2, "0");
  let seconds = datetime.getSeconds().toString().padStart(2, "0");
  let write_time =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  let ingredients = req.body.board_ingredient.split(",");

  con.query(
    `INSERT INTO \`Recipe\` (\`recipe_name\`, \`img_url\`) VALUES ('${req.body.recipe_name}', null)`,
    (err, result) => {
      if (err) {
        res.json({ result: false, error: err });
      } else {
        for (var i = 0; i < ingredients.length; i = i + 2) {
          con.query(
            `INSERT INTO \`Recipe_Ingredient\` (\`recipe_name\`, \`ingredient\`, \`ratio\`) VALUES ('${
              req.body.recipe_name
            }', '${ingredients[i]}', '${ingredients[i + 1]}')`,
            (err, result) => {
              if (err) {
                res.json({ result: false, error: err });
              }
            }
          );
          con.query(
            `INSERT INTO \`Ingredient\` (\`ingredient_name\`, \`count\`, \`ingredient_img_url\`) VALUE ('${ingredients[i]}', 1, null) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1;`,
            (err, result) => {
              if (err) {
                res.json({ result: false, error: err });
              }
            }
          );
        }
        con.query(
          `INSERT INTO \`Default_Board\` (\`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUES ('${req.body.recipe_name}', '${req.body.member_id}', '${write_time}', '${req.body.board_text}', '${req.body.board_snacks}', '${req.body.board_tool}');`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `SELECT \`board_id\` FROM \`Default_Board\` ORDER BY \`board_id\` DESC LIMIT 1`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: result });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/my_board", (req, res) => {
  // let datetime = new Date();
  // let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDate() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds();

  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1).toString().padStart(2, "0"); // 월 값은 0부터 시작하므로 1을 더하고, 2자리로 표시하도록 패딩을 추가합니다.
  let day = datetime.getDate().toString().padStart(2, "0"); // 일(day) 값을 가져오고, 2자리로 표시하도록 패딩을 추가합니다.
  let hours = datetime.getHours().toString().padStart(2, "0");
  let minutes = datetime.getMinutes().toString().padStart(2, "0");
  let seconds = datetime.getSeconds().toString().padStart(2, "0");
  let write_time =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  let ingredients = req.body.board_ingredient.split(",");

  con.query(
    `INSERT INTO \`Recipe\` (\`recipe_name\`, \`img_url\`) VALUES ('${
      req.body.recipe_name + "_" + req.body.member_id
    }', null)`,
    (err, result) => {
      if (err) {
        res.json({ result: false, error: err });
      } else {
        for (var i = 0; i < ingredients.length; i = i + 2) {
          con.query(
            `INSERT INTO \`Recipe_Ingredient\` (\`recipe_name\`, \`ingredient\`, \`ratio\`) VALUES ('${
              req.body.recipe_name + "_" + req.body.member_id
            }', '${ingredients[i]}', '${ingredients[i + 1]}')`,
            (err, result) => {
              if (err) {
                res.json({ result: false, error: err });
              }
            }
          );
          con.query(
            `INSERT INTO \`Ingredient\` (\`ingredient_name\`, \`count\`, \`ingredient_img_url\`) VALUE ('${ingredients[i]}', 1, null) ON DUPLICATE KEY UPDATE \`count\` = \`count\` + 1;`,
            (err, result) => {
              if (err) {
                res.json({ result: false, error: err });
              }
            }
          );
        }
        con.query(
          `INSERT INTO \`My_Board\` (\`recipe_name\`, \`member_id\`, \`write_time\`, \`text\`, \`snack\`, \`tool\`) VALUES ('${
            req.body.recipe_name + "_" + req.body.member_id
          }', '${req.body.member_id}', '${write_time}', '${
            req.body.board_text
          }', '${req.body.board_snack}', '${req.body.board_tool}');`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `SELECT \`myboard_id\` FROM \`My_Board\` ORDER BY \`myboard_id\` DESC LIMIT 1`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: result });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/default_comment", (req, res) => {
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1).toString().padStart(2, "0");
  let day = datetime.getDate().toString().padStart(2, "0");
  let hours = datetime.getHours().toString().padStart(2, "0");
  let minutes = datetime.getMinutes().toString().padStart(2, "0");
  let seconds = datetime.getSeconds().toString().padStart(2, "0");
  let write_time =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  con.query(
    `INSERT INTO \`Default_Board_Comment\` (\`text\`, \`member_id\`, \`datetime\`, \`board_id\`) VALUES ('${req.body.text}', '${req.body.member_id}', '${write_time}', ${req.body.board_id})`,
    (err, result) => {
      if (err) {
        res.json({ result: false, error: err });
      } else {
        res.json({ result: true });
      }
    }
  );
});

router.post("/my_comment", (req, res) => {
  //    let datetime = new Date();
  //    let write_time = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + '-' + datetime.getHours() + '-' + datetime.getMinutes() + '-' + datetime.getSeconds()
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1).toString().padStart(2, "0"); // 월 값은 0부터 시작하므로 1을 더하고, 2자리로 표시하도록 패딩을 추가합니다.
  let day = datetime.getDate().toString().padStart(2, "0"); // 일(day) 값을 가져오고, 2자리로 표시하도록 패딩을 추가합니다.
  let hours = datetime.getHours().toString().padStart(2, "0");
  let minutes = datetime.getMinutes().toString().padStart(2, "0");
  let seconds = datetime.getSeconds().toString().padStart(2, "0");
  let write_time =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  con
    .query(
      `INSERT INTO \`My_Board_Comment\` (\`text\`, \`member_id\`, \`datetime\`, \`myboard_id\`) VALUE('${req.body.text}', '${req.body.member_id}', '${write_time}', ${req.body.board_id})`,
      (err, result) => {
        if (err) {
          res.json({ result: false, error: err });
        } else {
          res.json({ result: true });
        }
      }
    )
    .catch((err) => {
      res.json({ result: false, error: err });
    });
});

router.post("/default_delete", (req, res) => {
  con.query(
    `SELECT \`member_id\` FROM \`Default_Board\` WHERE \`board_id\` = '${req.body.board_id}';`,
    (err, result) => {
      if (result[0].member_id == req.body.member_id) {
        con.query(
          `UPDATE \`Ingredient\` SET \`count\` = \`count\` - 1 WHERE \`ingredient_name\` IN (SELECT DISTINCT \`ingredient\` FROM \`Recipe_Ingredient\` WHERE \`recipe_name\` = '${req.body.recipe_name}')`,
          (err, result) => {
            if (err) throw err;
            else {
              con.query(
                `DELETE FROM \`Recipe_Ingredient\` WHERE \`recipe_name\` = '${req.body.recipe_name}'`,
                (err, result) => {
                  if (err) throw err;
                  else {
                    con.query(
                      `DELETE FROM \`DefaultBoardComment_Good\` WHERE \`board_comment_id\` IN (SELECT \`board_comment_id\` FROM \`Default_Board_Comment\` WHERE \`board_id\` = '${req.body.board_id}')`,
                      (err, result) => {
                        if (err) throw err;
                        else {
                          con.query(
                            `DELETE FROM \`DefaultBoard_Good\` WHERE \`board_id\` = '${req.body.board_id}'`,
                            (err, result) => {
                              if (err) throw err;
                              else {
                                con.query(
                                  `DELETE FROM \`Default_Board_Comment\` WHERE \`board_id\` = '${req.body.board_id}'`,
                                  (err, result) => {
                                    if (err) throw err;
                                    else {
                                      con.query(
                                        `DELETE FROM \`Default_Board\` WHERE \`board_id\` = '${req.body.board_id}'`,
                                        (err, result) => {
                                          if (err) throw err;
                                          else {
                                            con.query(
                                              `DELETE FROM \`Recipe\` WHERE \`recipe_name\` = '${req.body.recipe_name}'`,
                                              (err, result) => {
                                                if (err) throw err;
                                                else {
                                                  res.json({
                                                    result: true,
                                                    message:
                                                      "게시글이 삭제되었습니다.",
                                                  });
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        res.json({
          result: false,
          message: "해당 회원이 작성한 게시물이 아닙니다. 삭제가 불가능합니다.",
        });
      }
    }
  );
});

router.post("/my_delete", (req, res) => {
  con.query(
    `SELECT \`member_id\` FROM \`My_Board\` WHERE \`myboard_id\` = '${req.body.board_id}';`,
    (err, result) => {
      if (result[0].member_id == req.body.member_id) {
        con.query(
          `UPDATE \`Ingredient\` SET \`count\` = \`count\` - 1 WHERE \`ingredient_name\` IN (SELECT DISTINCT \`ingredient\` FROM \`Recipe_Ingredient\` WHERE \`recipe_name\` = '${req.body.recipe_name}')`,
          (err, result) => {
            if (err) throw err;
            else {
              con.query(
                `DELETE FROM \`Recipe_Ingredient\` WHERE \`recipe_name\` = '${req.body.recipe_name}'`,
                (err, result) => {
                  if (err) throw err;
                  else {
                    con.query(
                      `DELETE FROM \`MyBoardComment_Good\` WHERE \`myboard_comment_id\` IN (SELECT \`myboard_comment_id\` FROM \`My_Board_Comment\` WHERE \`myboard_id\` = '${req.body.board_id}')`,
                      (err, result) => {
                        if (err) throw err;
                        else {
                          con.query(
                            `DELETE FROM \`MyBoard_Good\` WHERE \`myboard_id\` = '${req.body.board_id}'`,
                            (err, result) => {
                              if (err) throw err;
                              else {
                                con.query(
                                  `DELETE FROM \`My_Board_Comment\` WHERE \`myboard_id\` = '${req.body.board_id}'`,
                                  (err, result) => {
                                    if (err) throw err;
                                    else {
                                      con.query(
                                        `DELETE FROM \`My_Board\` WHERE \`myboard_id\` = '${req.body.board_id}'`,
                                        (err, result) => {
                                          if (err) throw err;
                                          else {
                                            con.query(
                                              `DELETE FROM \`Recipe\` WHERE \`recipe_name\` = '${req.body.recipe_name}'`,
                                              (err, result) => {
                                                if (err) throw err;
                                                else {
                                                  res.json({
                                                    result: true,
                                                    message:
                                                      "게시글이 삭제되었습니다.",
                                                  });
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        res.json({
          result: false,
          message: "해당 회원이 작성한 게시물이 아닙니다. 삭제가 불가능합니다.",
        });
      }
    }
  );
});

// 보류
// router.post("/default_delete", (req, res) => {
//   con
//     .query(
//       `DELETE FROM \`Default_Board\` WHERE \`member_id\` = '${
//         req.member_id
//       } AND \`board_id\` = ${req.body.board_id}
//    DELETE FROM \`Default_Board_Comment\` WHERE \`board_id\` = ${
//      req.body.board_id
//    }
//    UPDATE \`ingredient\` SET \`count\` = \`count\` - 1 WHERE \`name\` IN (SELECT \`ingredient\` FROM \`Recipe\` WHERE \`recipe_name\` = ${
//      req.body.board_title + "_" + req.body.member_id
//    })
//    DELETE FROM \`Recipe\` WHERE \`recipe_name\` = ${
//      req.body.board_title + "_" + req.body.member_id
//    }`,
//       (err, result) => {
//         if (err) {
//           res.json({ result: false, error: err });
//         } else {
//           res.json({ result: true });
//         }
//       }
//     )
//     .catch((err) => {
//       res.json({ result: false, error: err });
//     });
// });

// router.post("/my_delete", (req, res) => {
//   con
//     .query(
//       `DELETE FROM \`My_Board\` WHERE \`member_id\` = '${
//         req.member_id
//       } AND \`board_id\` = ${req.body.board_id}
//    DELETE FROM \`My_Board_Comment\` WHERE \`board_id\` = ${req.body.board_id}
//    UPDATE \`ingredient\` SET \`count\` = \`count\` - 1 WHERE \`name\` IN (SELECT \`ingredient\` FROM \`Recipe\` WHERE \`recipe_name\` = ${
//      req.body.board_title + "_" + req.body.member_id
//    })
//    DELETE FROM \`Recipe\` WHERE \`recipe_name\` = ${
//      req.body.board_title + "_" + req.body.member_id
//    }`,
//       (err, result) => {
//         if (err) {
//           res.json({ result: false, error: err });
//         } else {
//           res.json({ result: true });
//         }
//       }
//     )
//     .catch((err) => {
//       res.json({ result: false, error: err });
//     });
// });

router.post("/good_default_board", (req, res) => {
  con.query(
    `SELECT COUNT(*) count FROM \`DefaultBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_id\` = '${req.body.board_id}'`,
    (err, result) => {
      if (result[0].count == 0) {
        con.query(
          `INSERT INTO \`DefaultBoard_Good\` (\`member_id\`, \`board_id\`) VALUE('${req.body.member_id}', '${req.body.board_id}')`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_id\` = '${req.body.board_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      } else {
        con.query(
          `DELETE FROM \`DefaultBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_id\` = '${req.body.board_id}'`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`Default_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_id\` = '${req.body.board_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/good_default_board_comment", (req, res) => {
  con.query(
    `SELECT COUNT(*) count FROM \`DefaultBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_comment_id\` = '${req.body.board_comment_id}'`,
    (err, result) => {
      if (result.length > 0 && result[0].count == 0) {
        con.query(
          `INSERT INTO \`DefaultBoardComment_Good\` (\`member_id\`, \`board_comment_id\`) VALUES ('${req.body.member_id}', '${req.body.board_comment_id}')`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`board_comment_id\` = '${req.body.board_comment_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      } else {
        con.query(
          `DELETE FROM \`DefaultBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`board_comment_id\` = '${req.body.board_comment_id}'`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`Default_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`board_comment_id\` = '${req.body.board_comment_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/good_my_board", (req, res) => {
  con.query(
    `SELECT COUNT(*) count FROM \`MyBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_id\` = '${req.body.board_id}'`,
    (err, result) => {
      if (result[0].count == 0) {
        con.query(
          `INSERT INTO \`MyBoard_Good\` (\`member_id\`, \`myboard_id\`) VALUE('${req.body.member_id}', '${req.body.board_id}')`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`myboard_id\` = '${req.body.board_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      } else {
        con.query(
          `DELETE FROM \`MyBoard_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_id\` = '${req.body.board_id}'`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`My_Board\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`myboard_id\` = '${req.body.board_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/good_my_board_comment", (req, res) => {
  con.query(
    `SELECT COUNT(*) count FROM \`MyBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_comment_id\` = '${req.body.myboard_comment_id}'`,
    (err, result) => {
      if (result.length > 0 && result[0].count == 0) {
        con.query(
          `INSERT INTO \`MyBoardComment_Good\` (\`member_id\`, \`myboard_comment_id\`) VALUES ('${req.body.member_id}', '${req.body.myboard_comment_id}')`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` + 1 WHERE \`myboard_comment_id\` = '${req.body.myboard_comment_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      } else {
        con.query(
          `DELETE FROM \`MyBoardComment_Good\` WHERE \`member_id\` = '${req.body.member_id}' AND \`myboard_comment_id\` = '${req.body.myboard_comment_id}'`,
          (err, result) => {
            if (err) {
              res.json({ result: false, error: err });
            } else {
              con.query(
                `UPDATE \`My_Board_Comment\` SET \`good_cnt\` = \`good_cnt\` - 1 WHERE \`myboard_comment_id\` = '${req.body.myboard_comment_id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ result: false, error: err });
                  } else {
                    res.json({ result: true });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
