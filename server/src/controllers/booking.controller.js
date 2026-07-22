import Booking from "../models/Booking.js";

//Post
async function createBooking(req, res, next) {
    try {
        const {name, phone, pickUpDate, from, to, vehicle} = req.body;

        if(!name || !phone || !pickUpDate || !from || !to || !vehicle){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }

        const booking = await Booking.create({
            name,
            phone,
            pickUpDate,
            from,
            to,
            vehicle
        });

        res.status(201).json({
            success: true,
            message: "Booking received. We'll call you back shortly.",
            booking
        });
    } catch (error) {
        next(error)
    }
}

//Get
async function listBooking(req, res, next) {
    try{
        const bookings = await Booking.find().sort({createdAt: -1});
        res.json(bookings);
    } catch(error){
        next(error);
    }
}

//update (patch)
async function updateBookingStatus(req, res, next) {
    try {
        const {status} = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {status},
            {new : true, runValidators: true}
        );

        if(!booking){
            return res.status(404).json({
                success: false,
                message: "Booking not found.."
            })
        }

        res.json(booking);
    } catch (error) {
        next(error)
    }
}

async function deleteBooking(req, res, next) {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if(!booking){
            return res.status(404).json({message: "Booking not Found."})
        }

        res.json({message: "Booking Deleted."})
    } catch (error) {
        next(error);
    }
}

export {createBooking, listBooking, updateBookingStatus, deleteBooking}