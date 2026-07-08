import Contact from "../models/Contact.js";

async function createContact(req, res, next) {
    try{
        const {name, phone, message} = req.body;

        if(!name || !phone){
            return res.status(400).json({
                success: false,
                message: "Name and phone are required..."
            });
        }

        const contact = await Contact.create({name, phone, message});
        res.status(201).json({
            success: true,
            message: "Thank, we'll be in touch.",
            contact
        })
    } catch(error){
        next(error);
    }
}

export default createContact