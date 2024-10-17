const express = require("express");
const auth = require("../middleware/auth");
const imageController = require("../controllers/imageController");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/addImage", auth, upload, imageController.addImage);
router.get("/getAllImage", auth, imageController.getAllImage);

module.exports = router;