import Transaction from "../model/transactionSchema.js";

export const pieChartData = async(req,res)=>{
    try{
        const month = parseInt(req.query.month) || 3;
        if(isNaN(month) || month<1 || month>12){
            return res.status(400).json({error:"Invalid month"});
        }
        const data = await Transaction.aggregate([
            {
                $match:{
                    $expr:{$eq:[{$month:"$dateOfSale"},month]}
                }
            },
            {
                $group:{
                    _id:"$category",
                    totalItems:{$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    category:"$_id",
                    totalItems:1
                }
            }
        ]);
        res.status(200).json({
            month,
            data
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}