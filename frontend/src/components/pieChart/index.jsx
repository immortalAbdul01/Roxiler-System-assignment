import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie'
import axios from "axios";
import "./style.css";
function PieChart({month,data,setData}) {
  const [chartData,setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/pieChartData?month=${month}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month,setData]);
  useEffect(()=>{
    if(data && data.data && data.data[0]){
      const transformedData = data.data.map(item => ({
        id: item.category,
        label: item.category,
        value: item.totalItems,
      }));
      setChartData(transformedData);
    }else setChartData([]);
  },[data]);

  return (
    <div style={{ height: "80vh" }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

export default PieChart;
