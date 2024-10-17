const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/register", upload, userController.register);
router.post("/login", userController.login);
router.get("/userinfo", auth, userController.userInfo);
router.get("/getAllUsers", auth, userController.getAllUsers);

module.exports = router;