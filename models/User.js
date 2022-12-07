const mongoose = require("mongoose");
const bcryp = require("bcrypt");
const slugify = require("slugify");

const Schema = mongoose.Schema;
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  slug: {
    type: String,
    require: true,
    trim: true,
  },
  furnitures: [String],
});

UserSchema.pre("validate", function (next) {
  const user = this;
  if (user.isModified("slug")) {
    user.slug = slugify(user.name, {
      lower: true,
      strict: true,
    });
    next();
  } else next();
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    console.log(user.password)
    bcryp.hash(user.password, 10, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  } else next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
