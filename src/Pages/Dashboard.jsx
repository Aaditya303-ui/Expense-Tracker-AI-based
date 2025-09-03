import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import EarningsCard from "./EarningsCard";
import EarningsChart from "./EarningsChart";
import RevenueSources from "./RevenueSources";
import "../Styling/DashBoard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="cards-row">
          <EarningsCard type="daily" amount={500} />
          <EarningsCard type="weekly" amount={10500} />
          <EarningsCard type="monthly" amount={60800} />
          <EarningsCard type="yearly" amount={60800} />
        </div>
        <div className="chart-row">
          <EarningsChart />
          <RevenueSources />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
