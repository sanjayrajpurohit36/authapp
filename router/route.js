"use strict";
const express = require("express");
const router = express.Router();
require("./../db/dbConfig");
const User = require("../models/userSchema");
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

router.get("/", (req, res) => {
  res.send({ message: "hello from home page" });
});

router.get("/about", middleWare, (req, res) => {
  res.send({ message: "hello from about page" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userExistQuery = await User.findOne({ email: email });
    if (!email || !password) {
      res.status(400).send({ message: "Missing fields" });
    } else if (userExistQuery && userExistQuery.password == password) {
      // password is hashed using the pre function in userSchema
      return res.send({ message: "login successful" });
    } else
      return res
        .status(400)
        .send({ message: "User is not registered, Kindly register" });
  } catch (err) {
    return res.send({ message: "Error occured while login", error: err });
  }
});

router.get("/register", (req, res) => {
  res.send({ message: "hello from signup page" });
});

// Using Promises
// router.post("/register", async (req, res) => {
//   let bodyData = req.body;
//   const { name, email, phone, password, cpassword } = req.body; // destructuring the body elements

//   if (!name || !email || !phone || !password || !cpassword) {
//     res.json({ error: "Kindly send all the fields" }); // error due to symentic entity
//   } else {
//     User.findOne({ email: email })
//       .then((userExist) => {
//         if (userExist) {
//           return res.json({ message: "Email already exist" });
//         }
//         const user = new User({ name, email, phone, password, cpassword });
//         user
//           .save()
//           .then((resolve, reject) => {
//             // resolve();
//             return res.json({ message: "User created successfully" });
//           })
//           .catch((error) => {
//             return res.json({
//               message: "Error in registering user. Try again after sometime.",
//               error: error,
//             });
//           });
//       })
//       .catch((error) => {
//         res.json({ error });
//       });
//   }
// });

router.post("/register", async (req, res) => {
  let bodyData = req.body;
  const { name, email, phone, password, cpassword } = req.body; // destructuring the body elements
  if (!name || !email || !phone || !password || !cpassword) {
    res.status(422).json({ error: "Kindly send all the fields" }); // error due to symentic entity
  } else {
    try {
      let userExistQueryResp = await User.findOne({ email: email });
      if (userExistQueryResp) {
        // if user already exist
        return res.json({ message: "Email already exist" });
      } else {
        const user = new User({ name, email, phone, password, cpassword });
        const userRegisterQueryResp = user.save();
        if (userRegisterQueryResp) {
          return res.json({ message: "User Registered Successfully" });
        } else {
          return res.json({ message: "User Register error occured" });
        }
      }
    } catch (err) {
      console.log("err in async operations", err);
    }
  }
});

module.exports = router;
