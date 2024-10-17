const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    priority: {
        type: String,
        enum: ["Extreme", "Moderate", "Low"],
        required: true,
    },
    taskDate: { type: Date,
        required: false,
    },
    status: {
        type: String,
        enum: ["Not Started", "Inprogress", "Completed"],
        default: "Not Started",
    },
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:"true",
    },
    createAt: {
        type: Date,
        default: Date.now,
    }, 
    collaboraters: [
        {
            collaboratername: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }, 
            status: {
                type: String,
                enum: ["Not Started","completed","Inprogress"],
                default: "Not Started",
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}); 

module.exports = mongoose.model("Task", TaskSchema);
