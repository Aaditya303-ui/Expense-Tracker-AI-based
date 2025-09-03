import express from "express";
import User from "../models/User.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Get all users
router.get("/users", isAdmin, async (req, res) => {
    try {
        const users = await User.find().select("-password"); // hide password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a user
router.delete("/user/:id", isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update a user (optional)
router.put("/user/:id", isAdmin, async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true }).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Create a new user
router.post("/user", isAdmin, async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            role,
            password, // ⚠️ if you’re hashing passwords, hash here before saving
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


export default router;
