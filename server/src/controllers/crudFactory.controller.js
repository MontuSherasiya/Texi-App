export function createCrudController(Model){
    return{
        // GET / (Public - active only, sorted by `order`)
        async listActive(req, res, next){
            try{
                const docs = await Model.find({active: true}).sort({order: 1});
                res.json(docs);
            } catch(err){
                next(err);
            }
        },

        // GET /all (admin - everything)
        async listAll (req, res, next){
            try {
                const docs = await Model.find().sort({order: 1, createdAt: -1});
                res.json(docs);
            } catch (error) {
                next(error);
            }
        },

        // POST / (admin)
        async create (req, res, next){
            try {
                const docs = await Model.create(req.body);
                res.json(docs);
            } catch (err) {
                next(err);
            }
        },

        //PUT /:id (admin)
        async update(req, res, next){
            try {
                const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!doc) return res.status(404).json({message: "Not Found"});
                res.json(doc)
            } catch (err) {
                next(err);
            }
        },

        //DELETE /:id (admin)
        async remove(req, res, next){
            try {
                const doc = await Model.findByIdAndDelete(req.params.id);
                if(!doc) return res.status(404).json({message: "Not FOund"});
                res.json({message: "Deleted."});
            } catch (err) {
                next(err);
            }
        }
    }
}