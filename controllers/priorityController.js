const mongoose = require("mongoose");
const PriorityModel = require("../models/Priority");

async function addPriority(req, res) {
    console.log(req.body);
    const userId = req.user._id;
    const { priority } = req.body;

    if(!["Extreme","Moderate","Low"].includes(priority)) {
        return res.status(400).send({message: "Invalid priority value"});
    }

    try {
        const existingPriority = await PriorityModel.findOne({ priority});

        if (existingPriority) {
            return res.status(400).send({ message: "Priority Already Exists"});
        } else {
            const newPriority = new PriorityModel({
                priority, 
                createdAt: Date.now(),
                createdBy: userId,
            });
            await newPriority.save();
            res.status(201).send({ message: "Priority Added Successfully"});
        }
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

// Get a Priorities By Using Id
async function getPriorityById(req, res) {
    console.log(req.body);
    const { id } = req.params;

    try {
        const priority = await PriorityModel.findById(id);
        console.log(id);
        if(!priority) {
            res.status(404).send({message: "Sorry, Priority Id are not found"});
        }
        return res.status(201).send({
            priority: priority.priority,
            createdBy: priority.createdBy,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get All Priorities
async function getAllPriority(req, res) {
    try {
        const priority = await PriorityModel.find();
        res.status(201).send({ priority: priority});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Update a Priority
async function updatePriority(req, res) {
    console.log(req.body);
    const { id } = req.params;

    try {
        const existingPriority = await PriorityModel.findByIdAndUpdate(id);
        if(!existingPriority) {
            res.status(404).send({ message: "Priority Not Found"});
        }
        existingPriority.priority = priority || existingPriority.priority;
        existingPriority.createdBy = createdBy || existingPriority.createdBy;
        await existingPriority.save();
        res.status(201).send({message: "Priority Updated Successfully"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Delete a Priority
async function deletePriority(req, res) {
    console.log(req.body);
    const { id } = req.params;
    try {
        const priority = await PriorityModel.findByIdAndDelete(id);
        if (!priority) {
            res.status(401).send({message: "Oops, Priority Not Found Yet"});
        }
        res.status(201).send({message: "Priority Deleted Successfully"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    addPriority,
    getPriorityById,
    getAllPriority,
    updatePriority,
    deletePriority,
};