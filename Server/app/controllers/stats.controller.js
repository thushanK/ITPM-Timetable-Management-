const Student = require("../models/student.model");
const Subjects = require("./../models/subject.model");
const Lecturer = require("./../models/lecturer.model");

exports.studentStats = async (req, res) => {
    try{
        Student.find()
        .then( student => {
            const len = student.length;
            console.log(len);

            let year1 = 0;
            let year2 = 0;
            let year3 = 0;
            let year4 = 0;

            student.forEach(element => {
                if(element.academicYear == 'Y1'){
                    year1++;
                }
                else if(element.academicYear == 'Y2'){
                    year2++;
                } 
                else if(element.academicYear == 'Y3'){
                    year3++;
                }
                else if(element.academicYear == 'Y4'){
                    year4++;
                }
            });

            res.status(200).send({
                count: len,
                year1: year1,
                year2: year2,
                year3: year3,
                year4: year4,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });
    }
    catch(err){
        console.log(err);
        return res.status(401).send({
            error: err
        });
    }
}

exports.lecturerStats = async (req, res) => {
    try{
        Lecturer.find()
        .then( lecs => {
            let type1 = 0;
            let type2 = 0;
            let type3 = 0;
            let type4 = 0;
            let type5 = 0;
            let type6 = 0;
            let type7 = 0;

            lecs.forEach(element => {
                if(element.level == 1){
                    type1++;
                }
                else if (element.level == 2){
                    type2++;
                }
                else if (element.level == 3){
                    type3++;
                }
                else if (element.level == 4){
                    type4++;
                }
                else if (element.level == 5){
                    type5++;
                }
                else if (element.level == 6){
                    type6++;
                }
                else if (element.level == 7){
                    type7++;
                }
            });

            res.status(200).send({
                lecs: lecs.length,
                type1: type1,
                type2: type2,
                type3: type3,
                type4: type4,
                type5: type5,
                type6: type6,
                type7: type7,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });
    }
    catch(err){
        console.log(err);
        return res.status(401).send({
            error: err
        });
    }
}

exports.subjectsStats = async (req, res) => {
    try{
        Subjects.find()
        .then( subs => {

            let year1 = 0;
            let year2 = 0;
            let year3 = 0;
            let year4 = 0;

            subs.forEach(element => {
                if(element.year == 1){
                    year1++;
                }
                else if(element.year == 2){
                    year2++;
                } 
                else if(element.year == 3){
                    year3++;
                }
                else if(element.year == 4){
                    year4++;
                }
            });

            res.status(200).send({
                subs: subs.length,
                year1: year1,
                year2: year2,
                year3: year3,
                year4: year4,
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });
    }
    catch(err){
        console.log(err);
        return res.status(401).send({
            error: err
        });
    }
}
