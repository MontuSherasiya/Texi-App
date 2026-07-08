import Vehicle from "../models/Vehicle.js";

//Get
async function listVehicles(req, res, next) {
    try{
        const vehicles = await Vehicle.find({
            active: true
        }).sort({ratePerKm: 1});

        res.json(vehicles)
    } catch(error){
        next(error);
    }
}

async function createVehicle(req, res, next) {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle Created successfully...",
            vehicle
        })
    } catch (error) {
        next(error);
    }
}

export {listVehicles, createVehicle};