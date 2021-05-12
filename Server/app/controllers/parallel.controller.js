

const Parallel = require('../models/parallel.model');
const Sessions = require('../models/sessions.model');



exports.add = async (req, res) => {
    
    if (req.body.session_01 == undefined || req.body.session_02 == undefined) {
        return res.status(400).send({ message: "2 sessions can not be empty!" });
    }

    const option = { session_01 : req.body.session_01 , session_02 :  req.body.session_02}
    const check_session = await Parallel.find(option);

    if(check_session.length > 0 ){
        return res.status(200).send({ message: "Already have a parallel session !" }); 
    }

    let new_parallel = Parallel({
        session_01 : req.body.session_01,
        session_02: req.body.session_02, 
    });

    const saved = await new_parallel.save();
    if(saved === new_parallel) {
        try{
        const success = await Sessions.update({
            _id: { "$in": [req.body.session_01 , req.body.session_02] }
            },{parallel: true},{multi: true});

        return res.status(200).send({ message: "Successfully Added !" }); 

        } catch (error) {
            return res.status(400).send({ message: "Update Failed !" }); 
        }

    }else{
        return res.status(400).send({ message: "Not created!" }); 
    }
    
    
};



exports.delete = async (req, res) => {
    
    if (req.params.id == null || req.params.id == undefined) {
        return res.status(400).send({
            message: "Content can not be empty!"
        }); 
    }

    try{
        const deleted = await Parallel.findOneAndDelete({ _id: req.params.id });
        if(deleted != null && deleted != undefined && deleted._id != undefined ){
            
            const success = await Sessions.update({
                _id: { "$in": [deleted.session_01 , deleted.session_02] }
                },{parallel: false},{multi: true});
    
            return res.status(200).send({ message: 'Deleted Successfully' }); 
        }
        return res.status(200).json({message : 'Deleted Successfully'});  

    }catch(err){
        return res.status(400).send({
            message: "Delete Failed !"
        });
    }
   
}













exports.get = async (req, res) => {

    const parallel = await Parallel.find({});
    
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
                from: "tags", // collection name in db
                localField: "tag",
                foreignField: "_id",
                as: "tag"
            }
        },
        {
            $lookup: {
                from: "subjects", // collection name in db
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $lookup: {
                from: "students", // collection name in db
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
                    }
                }
             }else{
                 return { _id : item._id , session_01 : {} , session_02 : {}}
             }
        })
        res.status(200).send({
            data : final
        })

    });

}

exports.getOne = async (req, res) => {

    console.log(req.params.id);

    try {
        const lecturessr = await Sessions.findOne({  _id: req.params.id });
        console.log(lecturessr);
        return res.status(200).send({
            data: lecturessr
        })
    } catch (error) {
        return res.status(401).send({
            error: error
        })
    }
}


