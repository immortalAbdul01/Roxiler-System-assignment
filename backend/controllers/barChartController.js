import Transaction from "../model/transactionSchema.js";

export const barChartData = async (req, res) => {
    try {
        const month = parseInt(req.query.month) || 3;
        if (isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ message: "Invalid month" });
        }

        const data = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
                }
            },
            {
                $group: {
                    _id: null,
                    "0-100":{$sum: {$cond: [{ $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] }, 1, 0]}},
                    "101-200":{$sum:{$cond:[{$and:[{$gt:["$price",100]},{$lte:["$price",200]}]},1,0]}},
                    "201-300":{$sum:{$cond:[{$and:[{$gt:["$price",200]},{$lte:["$price",300]}]},1,0]}},
                    "301-400":{$sum:{$cond:[{$and:[{$gt:["$price",300]},{$lte:["$price",400]}]},1,0]}},
                    "401-500":{$sum:{$cond:[{$and:[{$gt:["$price",400]},{$lte:["$price",500]}]},1,0]}},
                    "501-600":{$sum:{$cond:[{$and:[{$gt:["$price",500]},{$lte:["$price",600]}]},1,0]}},
                    "601-700":{$sum:{$cond:[{$and:[{$gt:["$price",600]},{$lte:["$price",700]}]},1,0]}},
                    "701-800":{$sum:{$cond:[{$and:[{$gt:["$price",700]},{$lte:["$price",800]}]},1,0]}},
                    "801-900":{$sum:{$cond:[{$and:[{$gt:["$price",800]},{$lte:["$price",900]}]},1,0]}},
                    "901-above":{$sum:{$cond:[{$gt:["$price",900]},1,0]}}
                }
            },
        ]);

        res.status(200).json({
            month,
            data
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}