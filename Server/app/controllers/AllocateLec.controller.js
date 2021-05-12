const AllocateLec = require("./../models/allocateLec.model");
const Lecturer = require('../models/lecturer.model');

exports.add = (req, res) => {
    
    const allLec = new AllocateLec({
        lecture: req.body.lecture,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
    });

    allLec.save((err, savedBuilding) => {
        if(err) return res.status(401).send(err);

        if(!savedBuilding) return res.status(400).send("Not created");

        return res.status(200).send(savedBuilding);
    });
};

exports.notavailable = (req, res) => {

    if(req.body.id == undefined && req.body.snv == undefined){
        return res.status(400).send({message : 'id, snv required'})
    }
    console.log("backend ekata awa")
    const conditions = { _id : req.body.id}
    const update = {$set:{ snv : req.body.snv }}

    Lecturer.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.get = (req, res) => {
    AllocateLec.find()
        .then( buildings => {
            res.status(200).send(buildings);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });
};


exports.delete = async (req, res) => {

    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    AllocateLec.findOneAndDelete({ _id: req.params.id })
    .then( result => {

        if (!result) {
            throw new Error('No record found')
        }

        res.status(200).send({
            message: "Deleted successfully"
        });
    
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the data."
        });
    });   
   
}
