const express = require("express");
const auth = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory",auth, categoryController.addCategory);
router.get("/getCategoryById/:id", auth, categoryController.getCategoryById);
router.get("/getAllCategory", auth, categoryController.getAllCategory);
router.put("/updateCategory/:id", auth, categoryController.updateCategory);
router.delete("/deleteCategory/:id", auth, categoryController.deleteCategory);

module.exports = router;