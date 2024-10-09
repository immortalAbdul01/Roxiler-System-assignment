import Transaction from "../model/transactionSchema.js";

export const transactions = async(req,res)=>{
    try{
        const searchQuery = req.query.search || "";
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page-1)*limit;
        const regex = new RegExp(searchQuery,'i');
        const month = parseInt(req.query.month)||3;
        if(isNaN(month)||month<1||month>12){
            return res.status(400).json({error:"Invalid month"});
        }
        var query = {
            $or:[
                {title:{$regex:regex}},
                {description:{$regex:regex}},
            ],
            $expr:{$eq:[{$month:"$dateOfSale"},month]}
        };
        if(searchQuery!="" && !isNaN(searchQuery)){
            query.$or.push({price:parseFloat(searchQuery)});
        }
        const transactions = await Transaction.find(query).skip(skip).limit(limit);
        const total = await Transaction.find(query).countDocuments();
        res.status(200).json({
            month,
            totalResults:total,
            page,
            totalPages: Math.ceil(total/limit),
            pageLimit:limit,
            totalDataInPage:transactions.length,
            data:transactions
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}