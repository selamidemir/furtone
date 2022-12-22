/* import modules */
const express = require("express");

const {userCheck} = require("../middlewares/auth");

const furnitureRouter = require("../controllers/furniture");
/* create router */
const router = express.Router();

/* list furnitures */
router.get("/", furnitureRouter.listFurnitures);

/* get furniture description */
router.get("/:id", furnitureRouter.getFurniture);

/* like  furniture */
router.get("/like/:id", userCheck, furnitureRouter.likeFurniture);

/* unlike  furniture */
router.get("/unlike/:id", userCheck, furnitureRouter.unLikeFurniture);

module.exports = router;