/* furniture contorllers */

/* add modules */
const Furniture = require("../models/Furniture");
const User = require("../models/User");

exports.listFurnitures = async (req, res) => {
  const filter = {};
  const furnitures = await Furniture.find(filter);
  res.status(200).render("furnitures", {
    pageName: "furnitures",
    title: "Furnitures - Furtone",
    furnitures,
  });
};

exports.getFurniture = async (req, res) => {
  try {
    const id = req.params.id;
    const furniture = await Furniture.findById(id);
    if (!furniture) {
      throw new Error("Cant find the furniture.");
    } else {
      let like = false;
      if (res.locals.userIN) {
        const user = await User.findById(res.locals.user.id);
        const thereIs = user.furnitures.includes(id);
        if (thereIs) like = true;
      }
      res.status(200).render("furniture", {
        pageName: "furniture",
        furniture,
        title: furniture.name + " - Furtore",
        like,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/");
  }
};

exports.likeFurniture = async (req, res) => {
  try {
    const furnitureId = req.params.id;
    const user = await User.findById(res.locals.user.id);
    user.furnitures.push(furnitureId);
    await user.save();
    res.status(200).redirect("/furnitures/" + furnitureId);
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/furnitures");
  }
};

exports.unLikeFurniture = async (req, res) => {
  try {
    const furnitureId = req.params.id;
    const user = await User.findById(res.locals.user.id);
    const furnitureIndex = user.furnitures.indexOf(furnitureId);
    if (furnitureIndex >= 0) {
      user.furnitures.splice(furnitureIndex, 1);
      await user.save();
    }

    res.status(200).redirect("/furnitures/" + furnitureId);
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/furnitures");
  }
};
