import React from "react";
import Heading from "../heading";
import Transactions from "../transactions";
import Statistics from "../statistics";
import BarChat from "../barChart";
import PieChart from "../pieChart";
import "./style.css";
function Section({tab,month,setMonth,search,setSearch,data,setData}) {
  return (
    <div className="section-container">
      <Heading tab={tab} month={month} setMonth={setMonth} search={search} setSearch={setSearch}/>
      {tab==1?<Transactions month={month} search={search} data={data} setData={setData}/>:''}
      {tab==2?<Statistics month={month} data={data} setData={setData}/>:''}
      {tab==3?<BarChat month={month} data={data} setData={setData}/>:''}
      {tab==4?<PieChart month={month} data={data} setData={setData}/>:''}
    </div>
  );
}

export default Section;
