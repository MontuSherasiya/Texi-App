import "dotenv/config";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const username = process.argv[2] || "admin";
const password = process.argv[3] || "changeme123";

async function run() {
    await connectDB();

    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.findOneAndUpdate(
        {username},
        {username, passwordHash},
        {upsert: true, new: true}
    );

    console.log(`Admin account ready - username: "${username}", password: "${password}"`);
    console.log("Change this password after your first login if it's a real deployment");

    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
})