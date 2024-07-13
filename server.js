import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import User from "./model/User.js";
// import Product from "./model/Product.js";
// import ProductStat from "./model/ProductStat.js";
// import Transaction from "./model/Transaction.js";
// import OverallStat from "./model/OverallStat.js";
// import AffiliateStat from "./model/AffiliateStat.js";
// import {
//   dataUser,
//   dataProduct,
//   dataProductStat,
//   dataTransaction,
//   dataOverallStat,
//   dataAffiliateStat
// } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

// console.log(process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("directory:", __dirname)

// Adjust the path to point to the build directory in Ipshita web/src
// const buildPath = path.join(__dirname, '..', 'ipsita.server', 'frontend', 'build');

const buildPath = path.join(__dirname, 'frontend', 'build');

console.log('Serving static files from:', buildPath);

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});




/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`\n\n${error} did not connect`));

// .then(() => {
//   app.listen(PORT, () =>
//     console.log(`Server Running on Port: http://localhost:${PORT}`)
//   );

//   /* ONLY ADD DATA ONE TIME */
//   // User.insertMany(dataUser)
// })
