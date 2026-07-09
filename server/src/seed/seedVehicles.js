//Run with npm run seed
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Vehicle from "../models/Vehicle.js";

const vehicles = [
    {
        name: "Swift Dzire",
        seats: 4,
        fuelType: "Diesel",
        ratePerKm: 12
    },
    {
        name: "Ertiga",
        seats: 6,
        fuelType: "Petrol + CNG",
        ratePerKm: 15
    },
    {
        name: "Innova Crysta",
        seats: 7,
        fuelType: "Diesel",
        ratePerKm: 20
    },
    {
        name: "Tempo Traveller - 14 Seater",
        seats: 14,
        fuelType: "Diesel",
        ratePerKm: 28
    },
    {
        name: "Tempo Traveller Maharaja",
        seats: 12,
        fuelType: "Diesel",
        ratePerKm: 30
    },
    {
        name: "Urbania - 12 Seater",
        seats: 12,
        fuelType: "Diesel",
        ratePerKm: 36
    },
];

async function run() {
    await connectDB();
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log(`Seeded ${vehicles.length} Vehicles.`);
    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.log(err);
    process.exit(1);
})