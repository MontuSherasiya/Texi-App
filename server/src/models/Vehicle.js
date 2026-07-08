import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    seats:{
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        trim: true
    },
    ratePerKm: {
        type: Number,
        required: true
    },
    dailyKmLimit: {
        type: Number,
        default: 300
    },
    photoUrl: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle;