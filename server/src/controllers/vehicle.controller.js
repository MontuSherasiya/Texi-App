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

async function listAllVehicles(req, res, next) {
    try {
        const vehicles = await Vehicle.find().sort({createdAt: -1});
        res.json(vehicles);
    } catch (error) {
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

async function updateVehicle(req, res, next) {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if(!vehicle){
            return res.status(404).json({message: "Vehicle not found."})
        }

        res.json(vehicle);
    } catch (error) {
        next(error);
    }
}

async function deleteVehicle(req, res, next) {
    try{
        const vehicles = await Vehicle.findByIdAndDelete(req.params.id);

        if(!vehicles){
            return res.status(404).json({message: "Vehicle not found."});
        }

        res.json({message: "Vehicle deleted."});
    } catch(err){
        next(err);
    }
}

export {listVehicles,listAllVehicles, createVehicle, updateVehicle, deleteVehicle};