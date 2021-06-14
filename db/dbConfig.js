const mongoose = require("mongoose");
const DB = process.env.DB;

// connecting the DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("Error in DB connection", err));
