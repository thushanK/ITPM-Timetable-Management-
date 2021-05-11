const AllocateGroup = require("./../models/AllocateGroup.model");
const Group = require('../models/student.model');

exports.notavailable = (req, res) => {

    if(req.body.id == undefined && req.body.snv == undefined){
        return res.status(400).send({message : 'id, snv required'})
    }

    const conditions = { _id : req.body.id}
    const update = {$set:{ snv : req.body.snv }}

    Group.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.get = (req, res) => {
    AllocateGroup.find()
        .then( alGroup => {
            res.status(200).send(alGroup);
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
    
    AllocateGroup.findOneAndDelete({ _id: req.params.id })
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
