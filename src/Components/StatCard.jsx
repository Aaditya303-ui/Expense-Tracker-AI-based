import React from "react";
import StatCard from "./StatCard";
import { FaCalendarAlt, FaDollarSign, FaCalendar, FaCommentDollar } from "react-icons/fa";

const StatsSection = () => {
  return (
    <div className="stats-section">
      <StatCard title="Earnings (Daily)" amount={500} color="#007bff" icon={<FaCalendarAlt />} />
      <StatCard title="Earnings (Weekly)" amount={10500} color="#28a745" icon={<FaDollarSign />} />
      <StatCard title="Earnings (Monthly)" amount={60800} color="#6f42c1" icon={<FaCalendar />} />
      <StatCard title="Earnings (Yearly)" amount={60800} color="#fd7e14" icon={<FaCommentDollar />} />
    </div>
  );
};

export default StatsSection;
