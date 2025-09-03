import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/admin/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(res.data);
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/admin/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Expenses</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp._id}>
              <td className="border px-4 py-2">₹{exp.amount}</td>
              <td className="border px-4 py-2">{exp.category}</td>
              <td className="border px-4 py-2">{exp.description}</td>
              <td className="border px-4 py-2">{exp.user?.email}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteExpense(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseManagement;
