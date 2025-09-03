import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import ExpenseForm from "./Components/ExpenseForm.jsx";
import ExpenseList from "./Components/ExpenseList.jsx";
import ChartSection from "./Components/ChartSection.jsx";
import Header from "./Components/Header.jsx";
import ExpenseSummary from "./Components/ExpenseSummary.jsx";
import IncomeSummary from "./Components/IncomeSummary.jsx";
import IncomeForm from "./Components/IncomeForm.jsx";
import TotalBalanceCard from "./Components/TotalBalanceCard.jsx";
import LoginForm from "./Components/Login.jsx";
import RegisterForm from "./Components/RegisterForm.jsx";
import AIInsight from "./Components/AIInsights.jsx";
import AdminPanel from "./Components/AdminPanel.jsx";
import { FinanceProvider } from "./Components/FinanceContext.jsx";

import "./Styling/auth.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const handleAddExpense = (expense) => setExpenses((prev) => [expense, ...prev]);
  const handleAddIncome = (income) => setIncomes((prev) => [income, ...prev]);

  const totalExpense = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  const totalIncome = incomes.reduce((acc, i) => acc + Number(i.amount), 0);
  const totalBalance = totalIncome - totalExpense;

  // Protect routes for admin only
  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/" />;
    if (user.role !== "admin") return <Navigate to="/" />;
    return children;
  };

  // Auth screen
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          {isRegistering ? (
            <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
          ) : (
            <LoginForm
              onLoginSuccess={(userData) => setUser(userData)}
              onSwitchToRegister={() => setIsRegistering(true)}
            />
          )}
          <p className="auth-toggle">
            {isRegistering ? (
              <>
                Already have an account? <span onClick={() => setIsRegistering(false)}>Login here</span>
              </>
            ) : (
              <>
                New user? <span onClick={() => setIsRegistering(true)}>Create an account</span>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  // Dashboard component
  const Dashboard = () => (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />

        {user.role === "admin" && (
          <div style={{ margin: "20px 0" }}>
            <Link to="/admin">
              <button style={{ padding: "10px 20px", cursor: "pointer" }}>Go to Admin Panel</button>
            </Link>
          </div>
        )}

        <div className="add-form-card" style={{ marginBottom: "20px" }}>
          <h2>💰 Add Salary / Income</h2>
          <IncomeForm onAddIncome={handleAddIncome} />
        </div>

        <div className="dashboard-cards">
          <TotalBalanceCard totalBalance={totalBalance} />
        </div>

        <div className="add-form-card" style={{ marginBottom: "20px" }}>
          <h2>🧾 Add Expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div className="section">
          <h2>📜 Expense List</h2>
          <ExpenseList expenses={expenses} />
        </div>

        <div className="dashboard-cards">
          <IncomeSummary incomes={incomes} />
          <ExpenseSummary expenses={expenses} />
        </div>

        <div className="section">
          <h2>📊 Visual Overview</h2>
          <ChartSection expenses={expenses} />
          <AIInsight expenses={expenses} incomes={incomes} />
        </div>
      </div>
    </div>
  );

  return (
    // <FinanceProvider>
    //   <Routes>
    //     <Route path="/" element={<Dashboard />} />
    //     <Route
    //       path="/admin"
    //       element={
    //         <AdminRoute>
    //           <AdminPanel />
    //         </AdminRoute>
    //       }
    //     />
    //     <Route
    //       path="*"
    //       element={
    //         <div style={{ padding: "50px", textAlign: "center" }}>
    //           <h2>404 - Page Not Found</h2>
    //           <p>The page you are looking for does not exist.</p>
    //         </div>
    //       }
    //     />
    //   </Routes>
    // </FinanceProvider>

    <FinanceProvider>
  <Routes>
    {/* Dashboard */}
    <Route path="/" element={<Dashboard />} />

    {/* Forms & Lists */}
    <Route path="/expense-form" element={<ExpenseForm onAddExpense={handleAddExpense} />} />
    <Route path="/expense-list" element={<ExpenseList expenses={expenses} />} />

    {/* Summaries */}
    <Route path="/expense-summary" element={<ExpenseSummary expenses={expenses} />} />
    <Route path="/income-summary" element={<IncomeSummary incomes={incomes} />} />

    {/* Extras */}
    <Route path="/general" element={<h2 style={{ padding: "20px" }}>⚙️ General Settings Page</h2>} />
    <Route path="/account" element={<h2 style={{ padding: "20px" }}>👤 Account Page</h2>} />

    {/* Admin */}
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminPanel />
        </AdminRoute>
      }
    />

    {/* 404 */}
    <Route
      path="*"
      element={
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </div>
      }
    />
  </Routes>
</FinanceProvider>

  );
};

export default App;
