require('dotenv').config();
import connectDB from "./config/db";
import express from "express";
import morgan from "morgan";

const app = express()
app.use(express.json())
app.use(morgan("env"))

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});