const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Importing Routes
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const priorityRouter = require("./routes/priorityRoutes");
const inviteRouter = require("./routes/inviteRoutes");
const imageRouter = require("./routes/imageRoutes");

const app = express();

// Middleware 
app.use(express.json());
app.use(cors());

// Database Connection Method
connectDB();

// All Required Routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/category", categoryRouter);
app.use("/api/priority", priorityRouter);
app.use("/api/invite", inviteRouter);
app.use("/api/image", imageRouter);

// for image uploads
app.use("/uploads", express.static("uploads"));

// PORT Number and process.env 
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
