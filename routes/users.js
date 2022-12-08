const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* login user form */
router.get("/login", userController.loginForm);

/* logout user form */
router.get("/logout", userController.logout);

/* register user form */
router.get("/register", userController.registerForm);

/* POST login user form */
router.post("/login", userController.login);

/* POST login user form */
router.post("/register", userController.register);

module.exports = router;
