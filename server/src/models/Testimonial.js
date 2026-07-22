import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    quote:{
        type: String,
        required: true,
        trim: true
    },
    who:{
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    order:{
        type: Number,
        default: 0,
    },
    active:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial