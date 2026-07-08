import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    phone:{
        type: String,
        require: true,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
}, {timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;