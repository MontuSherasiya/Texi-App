import { listBooking, createBooking, updateBookingStatus } from "../controllers/booking.controller.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router();

router.post('/', createBooking);
router.get('/', verifyToken, listBooking);
router.patch('/:id/status', verifyToken, updateBookingStatus);

export default router