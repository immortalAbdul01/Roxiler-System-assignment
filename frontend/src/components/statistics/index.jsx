import React, { useEffect } from "react";
import axios from "axios";
import "./style.css";
function Statistics({month,data,setData}) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/statistics?month=${month}`);
        setData(response.data);
        console.log("data",data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month,setData]);
  return (
    <div className="statistics-container">
      <div className=" card">
        <div className="data">₹{(data?.data?.totalSaleAmount || 0).toFixed(2)}</div>
        <div className="text">Total Sale Amount</div>
      </div>
      <div className="card">
        <div className="data">{data?.data?.totalSoldItems}</div>
        <div className="text">Total Sold Items</div>
      </div>
      <div className="card">
        <div className="data">{data?.data?.totalNotSoldItems}</div>
        <div className="text">Total UnSold Items</div>
      </div>
    </div>
  );
}

export default Statistics;
