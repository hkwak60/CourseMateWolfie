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

app.post("/postAccount", (req, res) => {
  const infos = req.body;
  console.log(infos);
  const sqlQuery = "INSERT INTO users (user_name, user_password) VALUES (?)";
  let values = [infos.user_name, infos.user_password];

  db.query(sqlQuery, [values], (err, result) => {
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
/*
app.post("/postData", (req, res) => {
  db.query("DELETE FROM question;");
  const questions = req.body;
  const sqlQuery =
    "INSERT INTO question (id, txt, answerType, multipleChoiceResponse, creationDate, deleted, submitted, response) VALUES ?";
  let id = 0;
  let values = questions.map((question) => {
    const cal = question.creationDate.split("T")[0].split("-");
    return [
      question.id,
      question.txt,
      question.answerType,
      question.multipleChoiceResponse,
      new Date(parseInt(cal[0]), parseInt(cal[1]) - 1, parseInt(cal[2])),
      question.deleted,
      question.submitted,
      question.response === null || question.response === undefined
        ? ""
        : question.response,
    ];
  });

  values.sort((a, b) => a[0] - b[0]);
  db.query(sqlQuery, [values], (err, result) => {
    if (err) {
      console.error("Error inserting questions: ", err);
      res.status(500).send("Error inserting questions");
    } else {
      console.log("Questions inserted successfully");
      res.status(200).send("Questions inserted successfully");
    }
  });
});

app.post("/postProfile", (req, res) => {
  db.query("DELETE FROM users;");
  const infos = req.body;
  const sqlQuery =
    "INSERT INTO users (user_name, email, profileImage, address) VALUES (?)";
  let values = [
    infos.user_name,
    infos.email,
    infos.profileImage,
    infos.address,
  ];

  db.query(sqlQuery, [values], (err, result) => {
    if (err) {
      console.error("Error inserting questions: ", err);
      res.status(500).send("Error inserting questions");
    } else {
      console.log("Questions inserted successfully");
      res.status(200).send("Questions inserted successfully");
    }
  });
});

app.get("/loadLogData", (req, res) => {
  const query = "SELECT * FROM question";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.get("/loadEditData", (req, res) => {
  const query = "SELECT * FROM question";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.get("/loadViewData", (req, res) => {
  const query =
    'SELECT * FROM question WHERE (deleted = 0 OR submitted = 1) AND (response != null OR response != "")';
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.get("/loadProfile", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    return res.send(results);
  });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
*/
