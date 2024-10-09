import React from "react";
import SearchBar from "../searchBar";
import MonthSelector from "../monthSelector";
import "./style.css";
function Heading({tab,month,setMonth,setSearch}) {
  return (
    <div className="heading-container">
      {tab===1?<h2>Transactions</h2>:''}
      {tab===2?<h2>Statistics</h2>:''}
      {tab===3?<h2>Bar Chart Stats</h2>:''}
      {tab===4?<h2>Pie Chart Stats</h2>:''}
      {tab===1?<SearchBar setSearch={setSearch} />:''}
      <MonthSelector month={month} setMonth={setMonth}/>
    </div>
  );
}

export default Heading;
