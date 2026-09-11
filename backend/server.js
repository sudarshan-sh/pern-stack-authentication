import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World- This is PERN auth project!");
});

app.listen(5000, () => {
  console.log(`Server is running on the PORT: 5000`);
});
