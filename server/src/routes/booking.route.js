import { listBooking, createBooking, updateBookingStatus, deleteBooking } from "../controllers/booking.controller.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router();

router.post('/', createBooking);
router.get('/', verifyToken, listBooking);
router.patch('/:id/status', verifyToken, updateBookingStatus);
router.delete('/:id', verifyToken, deleteBooking);

export default router