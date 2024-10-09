import Transaction from "../model/transactionSchema.js";
import axios from "axios";
export const initDatabase = async(req,res,next)=>{
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(response.data);
        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        res.status(500).send(error.message);
    }
}