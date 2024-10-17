const mongoose = require("mongoose");
const imageModel = require("../models/Image");

async function addImage(req, res) {
    try {
        const userId = req.user._id;

        const imageFile = req.file ? `/uploads/${req.file.filename}` : null;

        if (!imageFile) {
        return res.status(400).send({ message: "No image file uploaded" });
        }

        const newImage = await imageModel.create({
        userId,
        image: imageFile,
        });

        res.status(201).send({
        message: "Image added successfully",
        image: newImage,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
    }

    async function getAllImage(req, res) {
    try {
        const image = await imageModel.find();
        res.status(201).send({ image: image });
    } catch (error) {
        res.status(500).send(error.message);
    }
    }

    module.exports = {
    addImage,
    getAllImage,
    };