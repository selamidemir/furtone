/* import modules */
const express = require("express");

/* import controller */
const pagesController = require("../controllers/pages");

/* create router */
const router = express.Router();

/* set routers */
router.get("/", pagesController.getHome);

router.get("/about", (re1, res) => {
  res
    .status(200)
    .render("about", { pageName: "about", title: "About Us - Furtore" });
});

router.get("/contact", (req, res) => {
  res.status(200).render("contact", {
    pageName: "contact",
    title: "Contact Us - Furtore",
  });
});

module.exports = router;
