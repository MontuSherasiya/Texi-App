import mongoose from "mongoose";

const whyUsItemSchema = new mongoose.Schema({
    idx:{
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    body:{
        type: String,
        trim: true,
        required: true
    },
    order:{
        type: Number,
        default: 0
    },
    active:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const WhyUsItem = mongoose.model("WhyUsItem", whyUsItemSchema);

export default WhyUsItem