

const Subject = require('../models/subject.model');
// const Session = require('../models/sessions.model');


// create user
exports.add_subject = async (req, res) => {
    console.log(req.body);
    // Validate request
    if (req.body.name == null || req.body.name == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    let subject = Subject({
        year: req.body.year,
        semester: req.body.semester,
        name: req.body.name,
        code: req.body.code,
        lechours: req.body.lec_hour,
        tutehours: req.body.tute_hour,
        labhours: req.body.lab_hour,
        evaluationhour: req.body.evalu_hour,
    });
    // Save Tutorial in the database
    try {
        Subject.find({ code: subject.code }, function (err, docs) {
            if (docs.length == 0) {
                //save 
                subject.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    console.log("New Subject added");

                    return res.status(201).send(subject);
                })
            } else {
                return res.status(403).send('Already have')
            }
        })

    } catch (error) {
        return res.status(405).send(error)

    }
};



exports.edit_subject = async (req, res) => {
    console.log(req.body);
    if (req.body.code  == null || req.body.code  == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const update_result = await Subject.findOneAndUpdate({code: req.body.code}, 
        {year: req.body.year, semester: req.body.semester, name: req.body.name, lechours: req.body.lec_hour, tutehours: req.body.tute_hour, labhours: req.body.lab_hour, evaluationhour: req.body.evalu_hour},
        { new: true }
    ).then(result =>
        res.status(200).send({
            message: "Successfully update"
        })
    )
        .catch(err =>
            res.status(400).send({
                message: err
            })
        )


}


exports.delete_subject   = async (req, res) => {
    console.log(req.body);
    if (req.body.code == null || req.body.code == undefined) {
        return  res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var spec_subject = await Subject.findOne({code: req.body.code})
    if(!spec_subject){
        return  res.status(400).send({
            message: "No Found"
        });
    }
    var session_count = await Session.find({ subject: spec_subject._id }).countDocuments()
    console.log(session_count);

    if(session_count < 1){

        var result = await Subject.findOneAndDelete({code: req.body.code})
        if (!result) {
          return  res.status(400).send({
                message: "No Found"
            });
        }
        return res.status(200).send({
            message: "Deleted success"
        });
    }else{
        return res.status(401).send({
            message: "Please delete relevant session "
        });
    }

}


exports.get_all = async (req, res) => {



    try {
        const lecturer = await Subject.find();

        return res.status(200).send({
            data: lecturer
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}


exports.get_specific_subject = async (req, res) => {

    console.log(req.params);

    try {
        const lecturer = await Subject.find({  code: req.params.id });
        console.log(lecturer);
        return res.status(200).send({
            data: lecturer
        })
    } catch (error) {
        return res.status(401).send({
            error: error
        })
    }

}



exports.get_filtered = async (req, res) => {
    console.log(req.body);
    var word = req.body.word;
    var column
    var whe = {
        year: word
    }
   if(req.body.filed == "year"){
    column = "name"
    whe = {
        year: word
    }
   }
   else if(req.body.filed == "semester"){
    column = "semester"
    whe = {
        semester: word
    }
   }
   else if(req.body.filed == "name"){
    column = "name"
    whe = {
        name: word
    }
   }
   else if(req.body.filed == "code"){
    column = "code"
    whe = {
        code: word
    }
   }
  
   
    console.log(column);
    console.log(word);
     
     try {
        const subjects = await Subject.find( whe );  
            return   res.status(200).send({
             data: subjects
         })
     } catch (error) {
         return res.status(401).send({
             error: error
         })
     }
}


