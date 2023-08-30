import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

//dotenv CONFIGURATION

dotenv.config();

//CONNECTION TO DATABASE

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch(() => {
    console.log("connection failed...");
  });

const app = express();
const port = process.env.PORT || 8080;

//MIDDLEWARES

app.use(express.json());

//ROUTES

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log("server is running...");
});
