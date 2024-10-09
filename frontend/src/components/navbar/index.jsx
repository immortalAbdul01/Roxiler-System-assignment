import React from "react";
import "./style.css";
function Navbar({tab,setTab}) {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className={tab === 1 ? "transactions active" : "transactions"} onClick={() => setTab(1)}>
          Transactions
        </div>
        <span className="divider" />
        <div className={tab === 2 ? "statistics active" : "statistics"} onClick={() => setTab(2)}>
          Statistics
        </div>
        <span className="divider" />
        <div className={tab === 3 ? "barChart active" : "barChart"} onClick={() => setTab(3)}>
          Bar Chart
        </div>
        <span className="divider" />
        <div className={tab === 4 ? "pieChart active" : "pieChart"} onClick={() => setTab(4)}>
          Pie Chart
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
