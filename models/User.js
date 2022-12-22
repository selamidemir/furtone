const mongoose = require("mongoose");
const bcryp = require("bcrypt");
const slugify = require("slugify");

const { UserTypes } = require("../assets/userTypes");
const Furniture = require("./Furniture");

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
  furnitures: [Furniture],
  userType: String,
  furnitures: [String],
});

UserSchema.pre("validate", async function (next) {
  const user = this;
  /* Eğer ilk üye kayıt ediliyorsa
  bu üyeyi admin yap */
  const users = await User.findOne({});
  console.log(users, UserTypes.user);
  if (users) user.userType = UserTypes.user;
  else user.userType = UserTypes.admin;

  /* Üye işlemleri için slug oluştur */
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
  /* Şifreyi hash et */
  if (user.isModified("password")) {
    bcryp.hash(user.password, 10, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  } else next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
