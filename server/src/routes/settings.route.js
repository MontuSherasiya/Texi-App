import express from "express";
import {getSettings, updateSettings} from "../controllers/settings.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", verifyToken, updateSettings);

export default router;