const Tag = require('../models/Tag.model');
const Lecturer = require('../models/lecturer.model');
const Student = require('../models/student.model');
const Subject = require('../models/subject.model');
const Session = require('../models/sessions.model');
const Consecutive = require('../models/consecutive.model');
const Rooms = require('../models/room.model');

exports.add = (req, res) => {

    if(req.body.name == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'name, rooms required'})
    }

    const conditions = { name : req.body.name}
    const update = {$set:{ rooms: req.body.rooms}}

    Tag.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.addRoomsForLec = (req, res) => {

    if(req.body.id == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'id, rooms required'})
    }

    console.log(req.body);

    const conditions = { _id : req.body.id}
    const update = {$set:{ rooms: req.body.rooms}}

    Lecturer.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.addRoomsForGroups = (req, res) => {

    if(req.body.id == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'id, rooms required'})
    }

    console.log(req.body);

    const conditions = { _id : req.body.id}
    const update = {$set:{ rooms: req.body.rooms}}

    Student.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.addRoomsForSubject = (req, res) => {

    if(req.body.id == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'id, rooms required'})
    }

    console.log(req.body);

    const conditions = { _id : req.body.id}
    const update = {$set:{ rooms: req.body.rooms}}

    Subject.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.getAllSessions = (req, res) => {
    Session.aggregate([
        {
            $lookup: {
                from: "lecturers", 
                localField: "lecturer",
                foreignField: "_id",
                as: "lecturer"
            }
        },
        {
            $lookup: {
                from: "tags", 
                localField: "tag",
                foreignField: "_id",
                as: "tag"
            }
        },
        {
            $lookup: {
                from: "subjects", 
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $lookup: {
                from: "students", 
                localField: "group",
                foreignField: "_id",
                as: "group"
            }
        },
        {
        $project: {
            lecturer: { $arrayElemAt: ["$lecturer", 0], },
            tag: { $arrayElemAt: ["$tag", 0] },
            subject: { $arrayElemAt: ["$subject", 0] },
            group: { $arrayElemAt: ["$group", 0] },
            no_of_students: 1,
            duration: 1,
            rooms: 1,
            parallel : 1 , 
            consecutive : 1 
        }
        }
    ]).exec(function (err, result) {
        if (err) { return next(err) }

        res.status(200).send({
            result
        })

    });

}

exports.addRoomsForSession = (req, res) => {

    if(req.body.id == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'id, rooms required'})
    }

    console.log(req.body);

    const conditions = { _id : req.body.id}
    const update = {$set:{ rooms: req.body.rooms}}

    Session.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}

exports.getConsecutive = async (req, res) => {

    const parallel = await Consecutive.find({});
    
    Session.aggregate([
        {
            $lookup: {
                from: "lecturers",
                localField: "lecturer",
                foreignField: "_id",
                as: "lecturer"
            }
        },
        {
            $lookup: {
                from: "tags", 
                localField: "tag",
                foreignField: "_id",
                as: "tag"
            }
        },
        {
            $lookup: {
                from: "subjects", 
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $lookup: {
                from: "students", 
                localField: "group",
                foreignField: "_id",
                as: "group"
            }
        },
        {
            $project: {
                lecturer: { $arrayElemAt: ["$lecturer", 0], },
                tag: { $arrayElemAt: ["$tag", 0] },
                subject: { $arrayElemAt: ["$subject", 0] },
                group: { $arrayElemAt: ["$group", 0] },
                no_of_students: 1,
                duration: 1,
                parallel : 1 ,
                consecutive : 1 
            }
        }
    ]).exec(function (err, result) {
        
        console.log(result.map( i => i._id ))

        const final = parallel.map( item => {
           
            let session_01 = result.find( session => session._id == `${item.session_01}` ); 
            let session_02 = result.find( session => session._id == `${item.session_02}`);
            
            if(session_01 != undefined && session_02 != undefined){
                return {
                    _id : item._id ,
                    session_01 : {
                        _id : session_01._id ,
                        lecturer : session_01.lecturer.name ,
                        tag : session_01.tag.name ,
                        subject : session_01.subject.name ,
                        group : session_01.group.subgroup_ID ,
                    }, 
                    session_02 : {
                        _id : session_02._id ,
                        lecturer : session_02.lecturer.name ,
                        tag : session_02.tag.name ,
                        subject : session_02.subject.name ,
                        group : session_02.group.subgroup_ID ,
                    },
                    rooms: item.rooms,
                }
             }else{
                 return {  _id : item._id , session_01 : {} , session_02 : {}}
             }
        })
        res.status(200).send({
            data : final
        })

    });

}

exports.addRoomsForConSession = (req, res) => {

    if(req.body.id == undefined && req.body.rooms == undefined){
        return res.status(400).send({message : 'id, rooms required'})
    }

    console.log(req.body);

    const conditions = { _id : req.body.id}
    const update = {$set:{ rooms: req.body.rooms}}

    Consecutive.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}


exports.notavailable = (req, res) => {

    if(req.body.id == undefined && req.body.snv == undefined){
        return res.status(400).send({message : 'id, snv required'})
    }

    const conditions = { _id : req.body.id}
    const update = {$set:{ snv : req.body.snv }}

    Rooms.findOneAndUpdate(conditions , update , {new: true}, (err, updated) => {
         if(err) { return res.status(401).send(err); }
        console.log(updated)
        return res.json({ data : updated})
    });

}