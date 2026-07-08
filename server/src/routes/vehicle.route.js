import { listVehicles, createVehicle } from "../controllers/vehicle.controller.js";
import express from "express";
import requireAdminKey from "../middlewares/requireAdminkey.js";

const router = express.Router();

router.get('/', listVehicles);
router.post('/', requireAdminKey, createVehicle);

export default router