const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");
const port = process.env.port || 8000;

const app = express();
app.use(bodyparser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "chlgkstmd1",
  database: "project",
});

app.get("/", (req, res) => {
  const sqlQuery = "";
  db.query(sqlQuery, (err, result) => {
    console.log("Refresh");
    res.send("success!");
  });
});

app.get("/loadAccount", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.post("/postAccount", (req, res) => {
  const infos = req.body;
  const sqlQuery = "INSERT INTO users (user_name, user_password) VALUES (?)";
  let value = [infos.user_name, infos.user_password];

  db.query(sqlQuery, [value], (err, result) => {
    if (err) {
      console.error("Error inserting account: ", err);
      res.status(500).send("Error inserting account");
    } else {
      console.log("Account inserted successfully");
      res.status(200).send("Account inserted successfully");
    }
  });
});

app.get("/loadOnline", (req, res) => {
  const query = "SELECT * FROM online_user";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.post("/updateOnline", (req, res) => {
  const infos = req.body;
  const clearSql = "TRUNCATE TABLE online_user";
  db.query(clearSql);

  const sqlQuery =
    "INSERT INTO online_user (user_id, user_name, user_password) VALUES (?)";
  let value = [infos.user_id, infos.user_name, infos.user_password];

  db.query(sqlQuery, [value], (err, result) => {
    if (err) {
      console.error("Error inserting account: ", err);
      res.status(500).send("Error inserting account");
    } else {
      console.log("Account inserted successfully");
      res.status(200).send("Account inserted successfully");
    }
  });
});

app.post("/loadCourse", (req, res) => {
  let target = req.body;
  console.log(target);

  const query = "SELECT (id, course) = (?) FROM course_eval";
  db.query(query, target, (err, results) => {
    return res.send(results);
  });
  // const delQuery = "DELETE FROM course_eval WHERE course = (?)";
  // db.query(delQuery, target, (err, results) => {
  //   return res.send(results);
  // });
});

app.get("/loadGradeEval", (req, res) => {
  const query = "SELECT * FROM course_eval";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.post("/updateGradeEval", (req, res) => {
  const infos = req.body;

  const sqlQuery =
    "INSERT INTO course_eval (user_id, course, item, average, denom, percentage) VALUES (?)";
  let value = [
    infos.user_id,
    infos.course,
    infos.item,
    infos.average,
    infos.denom,
    infos.percentage,
  ];

  db.query(sqlQuery, [value], (err, result) => {
    if (err) {
      console.error("Error inserting account: ", err);
      res.status(500).send("Error inserting account");
    } else {
      console.log("Account inserted successfully");
      res.status(200).send("Account inserted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
