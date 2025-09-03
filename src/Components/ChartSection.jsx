import React from "react";
import { Pie } from "react-chartjs-2";
import "../Styling/ChartSection.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSection = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#17a2b8",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Category Breakdown</h2>
      {expenses.length === 0 ? (
        <p>No expenses to show in chart.</p>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
};

export default ChartSection;
