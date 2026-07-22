import { listVehicles, listAllVehicles, createVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/', listVehicles);
router.get('/all', verifyToken, listAllVehicles);
router.post('/', verifyToken, createVehicle);
router.put('/:id', verifyToken, updateVehicle);
router.delete('/:id', verifyToken, deleteVehicle);

export default router