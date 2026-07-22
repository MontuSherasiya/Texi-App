import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createCrudController} from "../controllers/crudFactory.controller.js";

//full REST route for a simple content model:
// GET    /     public - active items only
// GET    /all  admin  - everything, for the dashboard table
// POST   /     admin  - create
// PUT    /:id  admin  - update
// DELETE /:id  admin  - delete

export function createCrudRouter(Model){
    const router = express.Router();
    const ctrl = createCrudController(Model);

    router.get("/", ctrl.listActive);
    router.get("/all", verifyToken, ctrl.listAll);
    router.post("/", verifyToken, ctrl.create);
    router.put("/:id", verifyToken, ctrl.update);
    router.delete("/:id", verifyToken, ctrl.remove);

    return router;
}