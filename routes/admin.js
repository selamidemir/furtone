const express = require("express");
const adminController = require("../controllers/admin");
const {adminCheck} = require("../middlewares/auth");
const router = express.Router();

/* get furnitures */
router.get("/furnitures", adminController.listFurnitures);

/* add a new furniture page */
router.get("/furnitures/add", adminCheck, (req, res) => {
  res
    .status(200)
    .render("admin/add_furniture", {
      pageName: "add-furniture",
      title: "Add A New Furniture - Furtose",
      furniture: {},
      error: null
    });
});

/* add a new furniture */
router.post("/furnitures", adminCheck, adminController.addFurniture);

/* update the furniture */
router.put("/furnitures/:id", adminCheck, adminController.updateFurniture);

/* delete the furniture */
router.get("/furnitures/delete/:id", adminCheck, adminController.deleteFurniture);

module.exports = router;
