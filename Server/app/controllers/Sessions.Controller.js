
const Sessions = require('../models/sessions.model');
const Lecturers = require('../models/lecturer.model');
const Tags = require('../models/Tag.model');
const Subjects = require('../models/subject.model');
const Student = require('../models/student.model');



exports.add_session = async (req, res) => {
    console.log(req.body);
    
    if ((req.body.lecturer == null || req.body.lecturer == undefined) || (req.body.tag == null || req.body.group == undefined) || (req.body.group == null || req.body.tag == undefined)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    let sessions = Sessions({
        lecturer: req.body.lecturer,
        tag: req.body.tag,
        subject: req.body.subject,
        group  : req.body.group,
        no_of_students: req.body.no_of_students,
        duration: req.body.duration,

    });
   
    try {
       
        sessions.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log("New Session added");
            return res.status(201).send(sessions);
        })


    } catch (error) {
        return res.status(405).send(error)

    }
};


exports.all_info = async (req, res) => {
    try {
        const lecturers = await Lecturers.find({}, '_id name');
        const tags = await Tags.find({}, '_id name');
        const subjects = await Subjects.find({}, '_id name code');
        const students = await Student.find({}, '_id subgroup_ID');


        return res.status(200).send({
            lecturers,
            tags, subjects, students,
        })



    } catch (error) {
        return res.status(401).send({ error: error })
    }
};




exports.get_all_sessions = (req, res) => {
    Sessions.aggregate([
        {
            $lookup: {
                from: "lecturers", // collection name in db
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
                parallel: 1,
                consecutive: 1,
                snv: 1
            }
        }
    ]).exec(function (err, result) {
        if (err) { return next(err) }

        res.status(200).send({
            result
        })

    });

}




exports.get_filtered = async (req, res) => {
    console.log(req.body);

    var f_type = req.body.f_type
    var f_word = req.body.f_word
    var value = ""
    console.log(req.body.f_type);
    if ((f_type == undefined || f_type == null || f_type == "") || (f_word == undefined || f_word == null || f_word == "")) {
        return res.status(401).send({
            msg: "Please sent valid data"
        })
    }
    var options = "";
    if (f_type == "lecturer")
        options = { "lecturer.name": f_word }
    else if (f_type == "subject")
        options = { "subject.code": f_word }
    else if (f_type == "groupId")
        options = { "group.subgroup_ID": f_word }
    else if (f_type == "duration")
        options = { "duration": f_word }
    else if (f_type == "no_of_students")
        options = { "no_of_students": f_word }
    else if (f_type == "tag")
        options = { "tag.name": f_word }
    else
        value = ""

    console.log(value);
    var result = await Sessions.aggregate([
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
                parallel: 1,
                consecutive: 1,
                snv: 1
            }
        },
        { "$match": options },
    ])
    console.log(options);
  
    res.status(200).send({
        result
    })
}


exports.delete_sessions = async (req, res) => {
    console.log(req.body);
    console.log(req.body.id);
    if (req.body.id == null || req.body.id == undefined) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    
    console.log(session_count_in_session);
    
    
        var result = await Sessions.findOneAndDelete({ _id: req.body.id })
        if (!result) {
            return res.status(400).send({
                message: "No Found"
            });
        }
        return res.status(200).send({
            message: "Deleted success"
        });
    

}
