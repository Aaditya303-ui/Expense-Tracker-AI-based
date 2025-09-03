import React from "react";
import "../Styling/ExpenseList.css";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((expense, index) => (
          <div key={index} className="expense-card">
            <div className="expense-title">{expense.title}</div>
            <div className="expense-details">
              <span>₹ {expense.amount.toFixed(2)}</span>
              <span className="expense-category">{expense.category}</span>
              <span className="expense-date">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
