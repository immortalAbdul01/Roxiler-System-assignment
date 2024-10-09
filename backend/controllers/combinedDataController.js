import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export const combinedData = async(req,res)=>{
    try{
        const month = parseInt(req.params.month)||3;
        if(isNaN(month)|| month<1 || month>12){
            return res.status(400).json({error:"Invalid month"});
        }
        const statisticsDataURL = `${API_BASE_URL}/statistics?month=${month}`;
        const barChartDataURL = `${API_BASE_URL}/barChartData?month=${month}`;
        const pieChartDataURL = `${API_BASE_URL}/pieChartData?month=${month}`;
        const[statisticsData,barChartData,pieChartData] = await Promise.all([
            axios.get(statisticsDataURL),
            axios.get(barChartDataURL),
            axios.get(pieChartDataURL)
        ]);

        const data = {
            statisticsData:statisticsData.data,
            barChartData:barChartData.data,
            pieChartData:pieChartData.data
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}