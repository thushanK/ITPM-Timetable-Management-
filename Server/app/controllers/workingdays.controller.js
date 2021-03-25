const Workingdays = require('../models/workingdays.model');
const moment = require('moment');

exports.add = (req, res) => {

    let days = JSON.parse(req.body.dayslist);
    let d_list = days.map(item => {
        switch (item) {
            case 'Monday':
                return 1;
            case 'Tuesday':
                return 2;
            case 'Wednesday':
                return 3;
            case 'Thursday':
                return 4;
            case 'Friday':
                return 5;
            case 'Saturday':
                return 6;
            case 'Sunday':
                return 7;
        }
    })

    let group = Workingdays({
        name: req.body.name,
        daycount: req.body.daycount,
        dayslist: days,
        d_list: d_list,
        start_time: moment(req.body.start_time, 'HH:mm').format('HH:mm:ss'),
        end_time: moment(req.body.end_time, 'HH:mm').format('HH:mm:ss'),
    });

    group.save().then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Room."
            });
        });
};

exports.get = (req, res) => {
    Workingdays.find()
        .then(workingdays => {
            res.status(200).send(workingdays);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.getsingle = (req, res) => {
    Workingdays.find({ _id: req.params.id })
        .then(workingdays => {

            if (workingdays.length > 0) {
                res.status(200).send(workingdays[0]);
            } else {
                res.status(400).send({ message: 'Not Found !' })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.delete = async(req, res) => {

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Workingdays.findOneAndDelete({ _id: req.body.id })
        .then(result => {

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
                message: err.message || "Some error occurred while deleting the data."
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

    let d_list = req.body.dayslist.map(item => {
            switch (item) {
                case 'Monday':
                    return 1;
                case 'Tuesday':
                    return 2;
                case 'Wednesday':
                    return 3;
                case 'Thursday':
                    return 4;
                case 'Friday':
                    return 5;
                case 'Saturday':
                    return 6;
                case 'Sunday':
                    return 7;
            }
        })
        //return res.status(200).send({});
        //console.log(req.body)
        //return res.status(200).send(req.body);

    Workingdays.findOne({ _id: req.body.id }, (err, workingdays) => {
        if (err) return res.status(401).send(err);

        if (!workingdays) return res.status(404).send("Room not found");

        if (req.body.name != undefined) {
            workingdays.name = req.body.name;
        }

        if (req.body.daycount != undefined) {
            workingdays.daycount = req.body.daycount;
        }

        if (req.body.dayslist != undefined) {
            workingdays.dayslist = req.body.dayslist;
        }

        if (req.body.d_list != undefined) {
            workingdays.d_list = req.body.d_list;
        }

        if (req.body.start_time != undefined) {
            workingdays.start_time = moment(req.body.start_time, 'HH:mm').format('HH:mm:ss');
        }

        if (req.body.end_time != undefined) {
            workingdays.end_time = moment(req.body.end_time, 'HH:mm').format('HH:mm:ss');
        }

        workingdays.save((err, saved) => {
            if (err) return res.status(401).send(err);

            if (!saved) return res.status(404).send("Not saved");

            return res.status(200).send(saved);
        });
    });

};