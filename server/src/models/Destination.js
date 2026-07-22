import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    stopNo: {
        type: String,
        required: true,
        trim: true
    },
    name:{
        type:String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        required: true,
        trim: true
    },
    spots:{
        type:String,
        required:true,
        trim: true
    },
    order:{
        type: Number,
        default: 0,
    },
    active:{
        type:Boolean,
        default: true
    }
}, {timestamps: true});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination