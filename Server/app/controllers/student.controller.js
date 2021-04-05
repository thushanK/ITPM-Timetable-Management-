
//import Lecturer
const Student = require('../models/student.model');
const Sessions = require('../models/sessions.model');


// create user
exports.add = async (req, res) => {
    console.log("menna meka", req.body);
    // // Validate request
    // if (req.body.name == null || req.body.name == undefined) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }


    let newstudent = Student({
        academicYear: req.body.academicYear,
        semester: req.body.semester,
        group_mo: req.body.group_mo,
        subgroup_mo: req.body.subgroup_mo,
        program: req.body.program,
        subgroup_ID: req.body.subgroup_ID,
    });
    console.log("subgroup_ID : ", newstudent.subgroup_ID);
    // Save Tutorial in the database
    try {
        Student.findOne({ academicYear: newstudent.academicYear }, function (err, docs) {
            // if (docs.length == 0) {
            //save 
            newstudent.save(function (err) {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log("New user register");

                return res.status(200).send(newstudent);
            })
            // } else {
            //     return res.status(403).send('Already have')
            // }
        })

    } catch (error) {
        return res.status(405).send(error)

    }
};



exports.update = async (req, res) => {
    console.log(req.body);
    // if (req.body.empId == null || req.body.empId == undefined) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    const update_result = await Student.findOneAndUpdate({ academicYear: req.body.academicYear },
        {
            academicYear: req.body.academicYear,
            semester: req.body.semester,
            group_mo: req.body.group_mo,
            subgroup_mo: req.body.subgroup_mo,
            program: req.body.program,
            subgroup_ID: req.body.subgroup_ID
        },
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

exports.delete = async (req, res) => {

    console.log(req.params.id);

    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const result = await Student.findOne({ _id: req.params.id })
    if (!result) {
        res.status(400).send({
            message: "No data found"
        });
    }
    const res_session = await Sessions.find({ group: req.params.id }).countDocuments()
    console.log(res_session);
    if (res_session < 1) {
        const ee = await Student.findOneAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: "Deleted successfully"
        });
    } else {
        res.status(402).send({
            message: "Please delete sessions"
        });
    }
    // Student.findOneAndDelete({ _id: req.params.id })
    // .then( result => {

    //     if (!result) {
    //         throw new Error('No record found')
    //     }

    //     res.status(200).send({
    //         message: "Deleted successfully"
    //     });

    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message:
    //             err.message || "Some error occurred while deleting the data."
    //     });
    // });   

}


// exports.delete = async (req, res) => {

//     console.log(req.body);
//     // if (req.body.empId == null || req.body.empId == undefined) {
//     //     return  res.status(400).send({
//     //         message: "Content can not be empty!"
//     //     });
//     // }
//     var result = await Student.findOneAndDelete({id: req.body._id})
//     if (!result) {
//       return  res.status(400).send({
//             message: "No Found"
//         });
//     }
//     return res.status(200).send({
//         message: "Deleted success"
//     });

// }

exports.get = async (req, res) => {

    try {
        const lecturer2 = await Student.find();

        return res.status(200).send({
            data: lecturer2
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}

exports.getOne = async (req, res) => {

    console.log(req.params.id);

    try {
        const lecturessr = await Student.findOne({ _id: req.params.id });
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




