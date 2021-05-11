const Workingdays = require('../models/workingdays.model');
const Timeslot = require('../models/timeslot.model');
const moment = require('moment'); 

exports.add = (req, res) => {
    
    const Record = Timeslot({
        group_id : req.body.group_id,
        group_name: req.body.group_name,
        type : req.body.type,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
    });

    Timeslot.find({ group_id : req.body.group_id })
        .then( data => {
            var conflict = 0;
            
            var start = moment(req.body.start_time , 'hh:mm:ss').add(1, 'minutes');;
            var end = moment(req.body.end_time , 'hh:mm:ss').subtract(1 ,'minutes' )

            data.forEach( row => {
                var start_time = moment(row.start_time,'hh:mm:ss');
                var end_time = moment(row.end_time,'hh:mm:ss');

                if ( start.isBetween(start_time, end_time) || end.isBetween(start_time, end_time)) {
                    conflict++;
                }
            });

            if(conflict > 0 ){
                res.status(201).send({message : 'Duplicated Record'});
            }else{

            Record.save()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the timeslot."
                });
            });

            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the timeslot."
            });
        });
}

exports.get = (req, res) => {
    Timeslot.find()
        .then( workingdays => {
            res.status(200).send(workingdays);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.get = (req, res) => {
    Timeslot.find()
        .then( workingdays => {
            res.status(200).send(workingdays);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.getSingle = (req, res) => {
    Timeslot.find({ _id : req.params.id })
    .then( timeslot => {

        if (!timeslot) {
            throw new Error('No record found')
        }

        res.status(200).send(timeslot[0]);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the data."
        });
    });

};

exports.delete = async (req, res) => {
    
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
   
    await Timeslot.findOneAndDelete({ _id: req.body.id })
    .then( result => {

        if (!result) {
            throw new Error('No record found')
        }

        res.status(200).send({
            message: "Deleted successfully"
        });
    
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the data."
        });
    });   
   
}

exports.update = (req, res) => {

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    console.log(req.body);
   

    Timeslot.findOne({_id : req.body.id }, (err, timeslot) => {
        if(err) return res.status(401).send(err);

        if(!timeslot) return res.status(404).send("Room not found");

        if(req.body.start_time != undefined){
            timeslot.start_time = req.body.start_time;
        }

        if(req.body.end_time != undefined){
            timeslot.end_time = req.body.end_time;
        }

        if(req.body.type != undefined){
            timeslot.type = req.body.type;
        }

        timeslot.save((err, saved) => {
            if(err) return res.status(401).send(err);

            if(!saved) return res.status(404).send("Not saved");

            return res.status(200).send(saved);
        });
    });

};