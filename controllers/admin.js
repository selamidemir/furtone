/* admin controller */

/* import modules */
const fs = require("fs");

const Furniture = require("../models/Furniture");

/* list furnitures */
exports.listFurnitures = async (req, res) => {};

/* add a new furniture */
exports.addFurniture = async (req, res) => {
  if (req.body.name === "") {
    console.log("isim yok");
    res.status(400).redirect("/admin/furnitures/add");
  } else {
    try {
      const file = req.files.photo;
      const path = process.cwd() + "/public/uploads";
      if (!fs.existsSync(path))
        fs.mkdir(path, (err) => {
          if (err) {
            throw err;
          }
        });
      file.mv(path + "/" + file.name, async (err) => {
        if (err) {
          throw err;
        }
        const furnitureInfo = {
          name: req.body.name,
          description: req.body.description,
          photo: req.files.photo.name,
        };
        await Furniture.create(furnitureInfo, (err) => {
          if (err) {
            throw err;
          }
        });
      });
      res.redirect("/");
    } catch (error) {
      console.log("[ Error ] ", error);
      res.status(500).redirect("/admin/furnitures/add");
    }
  }
};

/* update the furniture */
exports.updateFurniture = async (req, res) => {};

/* delete furniture */
exports.deleteFurniture = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("No furniture founded.");
    }
    const furniture = await Furniture.findById(id);
    const path = process.cwd() + "/public/uploads/" + furniture.photo;
    fs.unlink(path, async (err) => {
      if (err) {
        throw err;
      }
      await Furniture.findByIdAndRemove(id);
    });
    res.status(200).redirect("/furnitures");
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/furnitures");
  }
};
