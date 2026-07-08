import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import contactRoutes from './routes/contact.route.js'
import vehicleRoutes from './routes/vehicle.route.js'
import bookingRoutes from './routes/booking.route.js'

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim());

app.use(cors({origin: allowedOrigins}))
app.use(express.json())
app.use(morgan("dev"))

//----- routes -----
app.use("/api/contact", contactRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});