import React from "react";
import "../Styling/ExpenseSummary.css";

const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return (
    <div className="expense-summary-card">
      <h3>Total Expenses</h3>
      <p className="amount">₹ {total.toFixed(2)}</p>
    </div>
  );
};

export default ExpenseSummary;
