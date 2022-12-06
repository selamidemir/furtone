const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Furtore Store Home" });
});

router.get("/about", (re1, res) => {
  res
    .status(200)
    .render("about", { pageName: "about", title: "About Us - Furtore" });
});

router.get("/contact", (req, res) => {
  res.status(200).render("contact", {
    pageName: "contact",
    title: "Contact U with Us - Furtore",
  });
});

router.get("login", (req, res) => {
  res
    .status(200)
    .render("login", { pageName: "login", title: "User Login - Furtore" });
});

module.exports = router;
