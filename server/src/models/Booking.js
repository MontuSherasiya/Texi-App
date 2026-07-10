import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    from:{
        type: String,
        required: true,
        trim: true
    },
    to:{
        type: String,
        required: true,
        trim: true
    },
    vehicle:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["new", "contacted", "confirmed", "completed", "cancelled"],
        default: "new"
    }
}, {timestamps: true})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking