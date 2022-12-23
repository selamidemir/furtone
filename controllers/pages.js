/* import models */
const Furniture = require("../models/Furniture");
const User = require("../models/User");

exports.getHome = async (req, res) => {
  try {
    const topFurnitures = await Furniture.find({}).sort({ name: -1 }).limit(5);
    const lastFurnitures = await Furniture.find({})
      .sort({ createdAt: -1 })
      .limit(12);
    res
      .status(200)
      .render("index", {
        pageName: "home",
        topFurnitures,
        lastFurnitures,
        title: "Furtore Furnitures",
      });
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/");
  }
};
