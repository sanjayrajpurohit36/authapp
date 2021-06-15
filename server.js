const express = require("express");
const dotenv = require("dotenv");
const { urlencoded } = require("express");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const app = express();

require("./db/dbConfig");
app.use(express.json()); // for converting all the request data in json format
app.use(require("./router/route"));

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
