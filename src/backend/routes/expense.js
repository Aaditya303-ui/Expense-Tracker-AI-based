import express from "express";
import Expense from "../models/Expense.js";
import jwt from "jsonwebtoken";
import expenseRouter from './routes/expense.js';
import adminRouter from './routes/admin.js';

const router = express.Router();

// Middleware to check user
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretkeyofexpenseapp123@#");
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = new Expense({ amount, category, description, user: req.userId });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all expenses for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all expenses (admin only)
router.get("/expenses", isAdmin, async (req, res) => {
  try {
    const expenses = await Expense.find().populate("user", "name email");
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete an expense
router.delete("/expense/:id", isAdmin, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use('/api/expenses', expenseRouter);
app.use('/api/admin', adminRouter);

export default router;
