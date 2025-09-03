import React from "react";
import "../Styling/IncomeSummary.css";

const IncomeSummary = ({ incomes }) => {
  const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount || 0), 0);

  return (
    <div className="income-summary-card">
      <h3>Total Income</h3>
      <p className="income-amount">₹ {totalIncome.toFixed(2)}</p>
    </div>
  );
};

export default IncomeSummary;
