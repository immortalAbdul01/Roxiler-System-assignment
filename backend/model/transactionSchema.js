import mongoose, { Model } from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
});
const Transaction = mongoose.model("transaction",transactionSchema);
export default Transaction;