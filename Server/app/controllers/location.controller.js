const Location = require("./../models/location.model");

exports.add = (req, res) => {

    const location = new Location({
        name: req.body.name,
        type: req.body.type,
        capacity: req.body.capacity,
        building: req.body.building,
    });

    // {
    //     "message": ,
    //     data: data
    // }

    location.save().then(data => {
        res.status(200).send({
            message: "Success",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Location."
        });
    });

};

exports.get = (req, res) => {
    Location.find()
        .then( locations => {
            res.status(200).send(locations);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.update = (req, res) => {

    if (req.body.id === null || req.body.id === undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {name, type, capacity, building} = req.body;
    console.log(req.body);

    Location.findOne({_id : req.body.id }, (err, foundLocation) => {
        if(err) return res.status(401).send(err);

        if(!foundLocation) return res.status(404).send("Location not found");

        if(name){
            foundLocation.name = req.body.name;
        }
        if(type){
            foundLocation.type = req.body.type;
        }
        if(capacity){
            foundLocation.capacity = req.body.capacity;
        }
        if(building){
            foundLocation.building = req.body.building;
        }

        foundLocation.save((err, savedLocation) => {
            if(err) return res.status(401).send(err);

            if(!savedLocation) return res.status(404).send("Not saved");

            return res.status(200).send(savedLocation);
        });
    });

};

exports.delete = async (req, res) => {

    if (req.params.id === null || req.params.id === undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Location.findOneAndDelete({ _id: req.params.id })
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

exports.getOne = async (req, res) => {

    console.log(req);

    try {
        const rom = await Location.findOne({ _id: req.params.id });
        return res.status(200).send({
            data: rom
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}


exports.getOneByName = async (req, res) => {

    console.log(req);

    try {
        const rom = await Location.findOne({ name : req.params.id });
        return res.status(200).send({
            data: rom
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}

