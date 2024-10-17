const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1); // exit when failure occurs
    }

    mongoose.connection.on("error", (error) => {
        console.log("Error:", error);
    });

    mongoose.connection.once("connected", () => {
        console.log("Database Connected");
    });
};

module.exports = connectDB;
