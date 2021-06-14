const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const app = express();

require("./db/dbConfig");

/**
 * Use of middleware is to check the data before going for the actual business logic
 * We use middlewares for authentication of the tokens provided by the users once
 * the token is identified then only user is allowed to go ahead in the application else
 * user is forced to login again / sugnup to the platform.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const middleWare = function (req, res, next) {
  console.log("hello from middle ware for private routes");
  // until I use the next argument till then the program will not go foreward
  next();
};

app.get("/", (req, res) => {
  res.send({ message: "hello from home page" });
});

app.get("/about", middleWare, (req, res) => {
  res.send({ message: "hello from about page" });
});

app.get("/login", (req, res) => {
  res.send({ message: "hello from login page" });
});

app.get("/signup", (req, res) => {
  res.send({ message: "hello from signup page" });
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
