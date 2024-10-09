import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();

dotenv.config()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5001, () => {
      console.log("🚀 server listening on port:➡ 5001");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
