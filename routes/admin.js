const express = require("express");
const adminController = require("../controllers/admin");
const authAdmin = require("../middlewares/authAdmin");
const router = express.Router();

/* get furnitures */
router.get("/furnitures", adminController.listFurnitures);

/* add a new furniture page */
router.get("/furnitures/add", authAdmin.adminCheck, (req, res) => {
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
router.post("/furnitures", authAdmin.adminCheck, adminController.addFurniture);

/* update the furniture */
router.put("/furnitures/:id", authAdmin.adminCheck, adminController.updateFurniture);

/* delete the furniture */
router.delete("/furnitures/:id", authAdmin.adminCheck, adminController.deleteFurniture);

module.exports = router;
