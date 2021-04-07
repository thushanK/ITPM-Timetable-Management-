const Room = require("./../models/room.model");

exports.add = (req, res) => {
    
    const room = new Room({
        name: req.body.name,
        type: req.body.type,
        capacity: req.body.capacity,
        building: req.body.building,
    });

    room.save().then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Room."
        });
    });

};

exports.get = (req, res) => {
    Room.find()
        .then( rooms => {
            res.status(200).send(rooms);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.update = (req, res) => {

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {name, type, capacity, building} = req.body;
    console.log(req.body);
    
    Room.findOne({_id : req.body.id }, (err, foundRoom) => {
        if(err) return res.status(401).send(err);

        if(!foundRoom) return res.status(404).send("Room not found");

        if(name){
            foundRoom.name = req.body.name;
        }
        if(type){
            foundRoom.type = req.body.type;
        }
        if(capacity){
            foundRoom.capacity = req.body.capacity;
        }
        if(building){
            foundRoom.building = req.body.building;
        }

        foundRoom.save((err, savedRoom) => {
            if(err) return res.status(401).send(err);

            if(!savedRoom) return res.status(404).send("Not saved");

            return res.status(200).send(savedRoom);
        });
    });

};

exports.delete = async (req, res) => {
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    await Room.findOneAndDelete({ _id: req.params.id })
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
        const rom = await Room.findOne({ _id: req.params.id });
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
        const rom = await Room.findOne({ name : req.params.id });
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

