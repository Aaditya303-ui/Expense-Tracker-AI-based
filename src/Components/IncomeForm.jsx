// // ✅ IncomeForm.jsx
// import React, { useState } from "react";
// import '../Styling/IncomeForm.css';

// const IncomeForm = ({ onAddIncome }) => {
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!description || !amount) return;

//     const newIncome = {
//       description,
//       amount: parseFloat(amount),
//     };

//     onAddIncome(newIncome);
//     setDescription("");
//     setAmount("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="income-form">
//       <input
//         type="text"
//         placeholder="Income Source"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button type="submit">Add Income</button>
//     </form>
//   );
// };

// export default IncomeForm;
// ✅ IncomeForm.jsx
import React, { useState, useContext } from "react";
import "../Styling/IncomeForm.css";
import { FinanceContext } from "../Components/FinanceContext"; // import context

const IncomeForm = ({ onAddIncome }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const { addRecord } = useContext(FinanceContext); // get context method

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newIncome = {
      description,
      amount: parseFloat(amount),
    };

    // ✅ Keep old behaviour for other frontend parts
    if (onAddIncome) onAddIncome(newIncome);

    // ✅ Also add to chatbot records automatically
    addRecord({
      income: parseFloat(amount),
      expense: 0,
      category: "Income",
    });

    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="income-form">
      <input
        type="text"
        placeholder="Income Source"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;

