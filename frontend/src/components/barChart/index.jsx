import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import axios from "axios";
import "./style.css";
function BarChart({month,data,setData}) {
  const [chartData,setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/barChartData?month=${month}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month,setData]);
  useEffect(()=>{
    if(data && data.data && data.data[0]){
      setChartData(
        [
          { range: "0-100", value:   data.data[0]["0-100"]},
          { range: "101-200", value: data.data[0]["101-200"] },
          { range: "201-300", value: data.data[0]["201-300"] },
          { range: "301-400", value: data.data[0]["301-400"] },
          { range: "401-500", value: data.data[0]["401-500"] },
          { range: "501-600", value: data.data[0]["501-600"] },
          { range: "601-700", value: data.data[0]["601-700"] },
          { range: "701-800", value: data.data[0]["701-800"] },
          { range: "801-900", value: data.data[0]["801-900"] },
          { range: "901-above", value: data.data[0]["901-above"] },
        ]
      );
    }else setChartData([]);
  },[data]);

  return (
    <div style={{ height: "80vh" }}>
      <ResponsiveBar
        data={chartData}
        keys={["value"]}
        indexBy="range"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Range",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Value",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

export default BarChart;
