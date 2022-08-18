const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { handleSingIn } = require("./routes/login");
const { handleRegister } = require("./routes/register");
const { addTask, markCompleted, deleteTask } = require("./routes/task");

const db = knex({
   client: "mysql",
   connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "todo",
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

app.delete("/task/:tid", (req, res) => {
   deleteTask(req, res, db);
});

app.listen(3000, () => {
   console.log("app is running in port 3000");
});
