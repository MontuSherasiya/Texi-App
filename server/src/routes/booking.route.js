import { listBooking, createBooking, updateBookingStatus } from "../controllers/booking.controller.js";
import express from "express";
import requireAdminKey from "../middlewares/requireAdminkey.js"

const router = express.Router();

router.post('/', createBooking);
router.get('/', requireAdminKey, listBooking);
router.patch('/:id/status', requireAdminKey, updateBookingStatus);

export default router