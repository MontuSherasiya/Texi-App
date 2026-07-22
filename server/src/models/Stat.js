import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    num:{
        type: String,
        required: true,
        trim: true
    },
    label:{
        type: String,
        required: true,
        trim: true
    },
    order:{
        type: Number,
        default: 0,
    },
    active:{
        type: Boolean,
        default: true,
    }
}, {timestamps: true});

const Stat = mongoose.model("Stat", statSchema);

export default Stat