/* import modules */
const express = require("express");

const furnitureRouter = require("../controllers/furniture");
/* create router */
const router = express.Router();

/* list furnitures */
router.get("/", furnitureRouter.listFurnitures);

module.exports = router;