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

exports.getFurniture = async (req, res) => {
  try {
    const id = req.params.id;
    const furniture = await Furniture.findById(id);
    if (!furniture) {
      throw new Error("Cant find the furniture.");
    } else {
      res.status(200).render("furniture", {
        pageName: "furniture",
        furniture,
        title: furniture.name + " - Furtore"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/");
  }
}
