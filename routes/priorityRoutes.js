const express = require("express");
const auth = require("../middleware/auth");
const priorityController = require("../controllers/priorityController");
const router = express.Router();

router.post("/addPriority",auth, priorityController.addPriority);
router.get("/getPriorityById/:id", auth, priorityController.getPriorityById);
router.get("/getAllPriority", auth, priorityController.getAllPriority);
router.put("/updatePriority/:id", auth, priorityController.updatePriority);
router.delete("/deletePriority/:id", auth, priorityController.deletePriority);

module.exports = router;