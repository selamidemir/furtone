/* furniture contorllers */

/* add modules */
const Furniture = require("../models/Furniture");

exports.listFurnitures = async (req, res) => {
  const filter = {};
  const furnitures = await Furniture.find(filter);
  res
    .status(200)
    .render("furnitures", {
      pageName: "furnitures",
      title: "Furnitures - Furtone",
      furnitures
    });
};
