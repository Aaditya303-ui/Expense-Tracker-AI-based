import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FinanceContext } from "./FinanceContext";
import "../Styling/ExpenseForm.css";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Others");
  const [budget, setBudget] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  const { addRecord } = useContext(FinanceContext);

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const isOverBudget = totalSpent > budget;

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (title.trim().length > 2) {
        axios
          .post("http://127.0.0.1:5000/predict-category", { title })
          .then((res) => {
            setCategory(res.data?.category || "Others");
          })
          .catch(() => setCategory("Others"));
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    setExpenses([...expenses, newExpense]);
    if (onAddExpense) onAddExpense(newExpense);

    // 🔥 Send to chatbot records
    addRecord({
      title,
      income: 0,
      expense: parseFloat(amount),
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("Others");
  };

  return (
    // ... same JSX as before ...
    <form className="expense-form" onSubmit={handleSubmit}>
     <h2>Add Expense</h2>

        {/* Budget Setter */}
         {/* <input
           type="number"
          placeholder="Set Monthly Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        /> */}

        {/* Budget Warning */}
        {/* {isOverBudget && (
          <p className="budget-warning" >
            ⚠ Budget exceeded! You’ve spent ₹{totalSpent} / ₹{budget}.
          </p>
        )} */}

        <input
          type="text"
          placeholder="Title (e.g., Starbucks, Zomato)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount (e.g., 250)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Predicted category */}
        <input
          type="text"
          value={category}
          readOnly
          style={{
            backgroundColor: "#f5f5f5",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "#555",
          }}
        />

        <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;
