import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styling/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "📊 Dashboard", icon: "📊" },
    { path: "/expense-form", label: "💸 Expense Form", icon: "💸" },
    { path: "/expense-list", label: "💰 Expense List", icon: "💰" },
    { path: "/expense-summary", label: "📈 Expense Summary", icon: "📈", separator: true },
    { path: "/income-summary", label: "📊 Income Summary", icon: "📊" },
    { path: "/account", label: "👤 Account", icon: "👤" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">ExpenseWise</h2>
      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {item.separator && <hr />}
            <li className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path} className="nav-link">
                {item.label}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;