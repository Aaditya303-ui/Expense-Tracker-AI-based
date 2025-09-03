import React from "react";
import "../Styling/Forecast.css";

const ForecastSection = ({ expenses, forecast }) => {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetLimit = forecast || 5000;

  const isOverspending = totalSpent > budgetLimit;

  return (
    <div className="forecast-section">
      <h2>Budget Forecast</h2>
      <p><strong>Predicted Monthly Budget:</strong> ₹{budgetLimit.toFixed(2)}</p>
      <p><strong>Total Spent:</strong> ₹{totalSpent.toFixed(2)}</p>

      {isOverspending ? (
        <div className="alert overspending">
          ⚠️ You have exceeded your budget!
        </div>
      ) : (
        <div className="alert within-budget">
          ✅ You are within the budget.
        </div>
      )}
    </div>
  );
};

export default ForecastSection;
