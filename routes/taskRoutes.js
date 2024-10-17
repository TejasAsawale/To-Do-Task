const express = require("express");
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/addTask", auth, upload, taskController.addTask);
router.post("/addCollaborator/:id", auth, taskController.addCollaborator);
router.get("/getTaskById/:taskId", auth, taskController.getTaskById);
router.get("/getAllTask", auth, taskController.getAllTask);
router.put("/updateTask/:id", auth, taskController.updateTask);
router.delete("/deleteTask/:id", auth, taskController.deleteTask);
router.get("/getFilteredTasks", auth, taskController.getFilteredTasks);
router.get("/getTasksForUser", auth, taskController.getTasksForUser);

module.exports = router;