const mongoose = require("mongoose");
const categoryModel = require("../models/Category");
const jwt = require("jsonwebtoken");

async function addCategory(req, res) {
    console.log(req.body);
    const userId = req.user._id;
    const { categoryName, createdBy, createdAt } = req.body;
    try {
        const existingCategory = await categoryModel.findOne({ categoryName });
        if (existingCategory) {
        return res.status(400).send({ message: "Category Already Exists" });
        } else {
        const newCategory = new categoryModel({
            categoryName,
            createdBy: userId,
            createdAt: Date.now(),
        });
        await newCategory.save();
        res.status(201).send({ message: "Category Added Successfully"});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Get A Category by id 
async function getCategoryById(req, res) {
    console.log(req.body);
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        console.log(id);
        if (!category) {
        res.status(404).send({ msg: "category id is not found" });
        }
        return res.status(201).send({
        categoryName: category.categoryName,
        createdBy: category.createdBy,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// get All Category 
async function getAllCategory(req, res) {
    try {
        const category = await categorymodel.find();
        res.status(201).send({ category: category });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//  Update A Category
async function updateCategory(req, res) {
    console.log(req.body);
    const { categoryName, createdBy } = req.body;
    const { id } = req.params;

    try {
        const category = await categoryModel.findByIdAndUpdate(id);
        if (!category) {
        res.status(404).send({ message: "Category Not Found" });
        }
        category.categoryName = categoryName || category.categoryName;
        category.createdBy = createdBy || category.createdBy;
        await category.save();
        res.status(201).send({ message: "Category Updated Successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Delete A Category 

async function deleteCategory(req, res) {
    console.log(req.body);
    const { id } = req.params;
    try {
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
        res.status(404).send({ message: "Category Not Found" });
        }
        res.status(201).send({ message: "Category Deleted Successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    addCategory,
    getCategoryById,
    getAllCategory,
    updateCategory,
    deleteCategory,
};