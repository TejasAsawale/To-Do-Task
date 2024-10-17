const express = require("express");
const auth = require("../middleware/auth");
const inviteController = require("../controllers/inviteController");
const router = express.Router();

router.post("/invitation",auth, inviteController.invitation);

module.exports = router;
