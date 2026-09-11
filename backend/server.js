import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

dotenv.config(); // reads the key-value pairs from .env and inject the values in process.env

const app = express();

app.use(express.json()); // to parse json request body
app.use(cookieParser()); // to parse cookies coming from the request headers

// +++++register the routes with the application+++++
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World- This is PERN auth project!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
});
