const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require("../models/User"); 

// register a new user
async function register(req, res) {
    console.log(req.body);
    const {firstName, lastName, username, email, password, confirmPassword, createdAt} = req.body;

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            const image = req.file ? req.file.filename : null;
            const newUser = new userModel({
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
                image,
                createdAt: Date.now(),
            });

            await newUser.save();

            res.status(201).send({ message: "User Registered Successfully", success: true});
        } else {
            res.status(400).send({ message: "User Already exists", success: false});
        } 
    } catch (error) {
        res.status(500).send({error: error.message, success: false});
    }
}

// Login a user
async function login(req, res) {
    console.log(req.body);
    try {
        const {username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user || !(await user.confirmPassword(password))) {
            return res.status(400).send({error: "Invalid username or Password"});
        }
        const token = jwt.sign({_id: user._id}, "key" , {
            expiresIn: "1h",
        });
        res.status(200).send({user: user, access: token, success: true});
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
}

// Get User Information
async function userInfo(req, res) {
    console.log("....", req.user);
    const id = req. req.user._id;
    try {
        const user = await userModel.findById(id);
        console.log(user);
        if (!user) {
            res.status(404).send({ message: "User does not found here", success: false});
        } else {
            res.status(201).send({ user: user, success: true});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//  Get All Users 
async function getAllUsers(req, res) {
    try {
        const users = await userModel.find();
        if (!users.length) {
            return res.status(404).send({ message: "User Can't Found", success: false});
        }
        res.status(200).send({ users, success: true});
    } catch (error) {
        res.status(500).send({error: error.message, success: false});
    }
}

// Exports all modules with functionality
module.exports = {
    register,
    login,
    userInfo,
    getAllUsers,
};
