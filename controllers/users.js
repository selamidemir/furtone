/* import modules */
const bcyrpt = require("bcrypt");
const { UserTypes } = require("../assets/userTypes");
const User = require("../models/User");

/* user login form */
exports.loginForm = (req, res) => {
  res.status(200).render("login", {
    pageName: "login",
    title: "User Login - Furtore",
    error: null,
  });
};

/* user register form */
exports.registerForm = (req, res) => {
  res.status(200).render("register", {
    pageName: "register",
    title: "User register - Furtore",
    errors: null,
  });
};

/* login user */
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    /* eposta  kayıtlı mı? */
    const user = await User.findOne({ email: email });
    const hashPassword = user ? user.password : null;

    /* şifreleri kontrol et */
    bcyrpt.compare(password, hashPassword, (err, result) => {
      if (result) {
        const userInfo = {
          id: user._id,
          name: user.name,
          email: user.email,
          slug: user.slug,
          userType: user.userType,
        };
        req.session.user = user;
        res.locals.user = userInfo;
        res.locals.userIN = true;
        if (req.session.user.userType === UserTypes.admin)
          res.locals.admin = true;
        else res.locals.admin = false;
        res.status(200).redirect("/");
      } else {
        const error = "The user was not found.";
        req.session.user = null;
        res.locals.user = null;
        res.locals.userIN = false;
        res.locals.admin = false;
        res.status(400).render("login", {
          pageName: "login",
          title: "User Login - Furtore",
          error,
        });
      }
    });
  } catch (err) {
    /* Beklenmeyen hata oluştu */
    res.status(500).render("wrong", {
      pageName: "wrong",
      title: "Something Goes Wrong! - Furtore",
      error: "Something Goes Wrong!",
    });
  }
};

/* user logout */
exports.logout = (req, res) => {
  res.locals.userIN = null;
  req.session.user = null;
  res.locals.user = null;
  res.status(200).redirect("/");
};

/* register user */
exports.register = async (req, res) => {
  try {
    /* Önce eposta kayıtlı mı denetle 
    Eğer kayıtlı ise uye zaten kayıtlıdır. */
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (user) {
      /* Üye zaten kayıtlı geri dön */
      res.status(400).render("register", {
        pageName: "register",
        title: "User register - Furtore",
        error: "The email has already used.",
      });
    } else {
      /* Üye kayıtını yap */
      const userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: UserTypes.user,
      };
      await User.create(userInfo, (err) => {
        /* Üye oluşturulamadı bir hata var */
        if (err) throw err;
      });
      /* Üye kayıt edildi. Logine yönlendir */
      res.status(201).redirect("/users/login");
    }
  } catch (err) {
    /* Beklenmeyen hata oluştu */
    res.status(500).render("wrong", {
      pageName: "wrong",
      title: "Somethings Goes Wrong! - Furtore",
    });
  }
};
