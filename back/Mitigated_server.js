const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql");

const { body } = require("express-validator");

const app = express();

app.use(cors());
app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lab2",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//add new user
app.post(
  "/store-data",
  //////////////////////////////// input sanitization in backend
  body("username").escape(),
  body("email").escape(),

  (req, res) => {
    let data = { username: req.body.username, email: req.body.email };

    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;

      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
  }
);

app.get("/users", (req, res) => {
  let sql = "SELECT * From users ";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(3002, () => {
  console.log("Server running successfully on 3002");
});
