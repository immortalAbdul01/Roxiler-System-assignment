import express from "express";
import {transactions} from "../controllers/transactionController.js";
import {initDatabase} from "../controllers/initController.js";
import { statistics } from "../controllers/statisticsController.js";
import { barChartData } from "../controllers/barChartController.js";
import { pieChartData } from "../controllers/pieChartController.js";
import { combinedData } from "../controllers/combinedDataController.js"
const router = express.Router();


router.use("/init",initDatabase);
router.use("/transaction",transactions);
router.use("/statistics",statistics);
router.use("/barChartData",barChartData);
router.use("/pieChartData",pieChartData);
router.use("/:month",combinedData);

//TODO: Remove this
router.get("/",async(req,res)=>{
    res.status(200).send("All set");
});

export default router;