import React from "react";
import '../Styling/TotalBalanceCard.css'

const TotalBalanceCard = ({ totalBalance }) => {
  return (
    <div className="balance-card">
      <h3>Total Balance</h3>
      <p className={totalBalance >= 0 ? "positive" : "negative"}>
        ₹ {totalBalance.toLocaleString()}
      </p>
    </div>
  );
};

export default TotalBalanceCard;
