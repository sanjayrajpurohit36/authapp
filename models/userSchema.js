const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, requried: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
});

// hashing password
userSchema.pre("save", async function (req, res, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }
  next();
});

// we're generating auth token by using instance method
userSchema.methods.generateAuthToken = async function () {
  try {
    /**
     * jwt.sign requires two arguments 1 payload obj {}, secret key
     * payload must be unique
     * secretkey
     * */
    let generatedToken = jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.SECRET_KEY
    );
    // saving the token to the db
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
    return generatedToken; // returning the token so that it can be sent to FE
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("USER", userSchema);
module.exports = User;
