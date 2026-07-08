import mongoose from 'mongoose';

async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if(!uri){
        console.error("MONGO is missing.");
        process.exit(1);
    }

    try{
        await mongoose.connect(uri);
        console.log(`Mongo Connected: ${mongoose.connection.host}`);
    } catch(error){
        console.error('Mongo connection Failed: ', error.message);
        process.exit(1);
    }
}

export default connectDB;