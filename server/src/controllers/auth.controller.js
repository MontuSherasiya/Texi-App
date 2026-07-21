import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export async function login(req, res, next) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password are required..."
            });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invaild Username or password..."
            });
        }

        const match = await bcrypt.compare(password, admin.passwordHash);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invaild Username or Password..."
            });
        }

        const token = jwt.sign({
            id: admin._id,
            username: admin.usernamme
        }, process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            username: admin.username
        })
    } catch (err) {
        next(err);
    }
}