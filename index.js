const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();
const { handleSingIn } = require("./routes/login");
const { handleRegister } = require("./routes/register");
const {
   addTask,
   markCompleted,
   deleteTask,
   getAllTask,
   markInCompleted,
} = require("./routes/task");

const db = knex({
   client: "mysql",
   connection: {
      host: "localhost",
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
   },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
   handleSingIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
   handleRegister(req, res, db, bcrypt);
});

app.post("/addtask", (req, res) => {
   addTask(req, res, db);
});

app.post("/markcompleted/:tid", (req, res) => {
   markCompleted(req, res, db);
});

app.post("/markincompleted/:tid", (req, res) => {
   markInCompleted(req, res, db);
});

app.delete("/task/:tid", (req, res) => {
   deleteTask(req, res, db);
});

app.get("/getalltask/:userId", (req, res) => {
   getAllTask(req, res, db);
});

app.listen(3000, () => {
   console.log("App is running in port: 3000");
});
