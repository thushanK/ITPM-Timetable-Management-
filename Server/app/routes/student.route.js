const express = require('express');
const router = express.Router();

const student = require('../controllers/student.controller');


//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

    // Create new  group
    router.post("/add", student.add );
       
    //Get all group list
    router.get('/get' , student.get );

    // //Update selected group
    router.post('/update' , student.update );

    // //Delete selected group
    router.delete('/delete/:id' , student.delete );

        //get one building
        router.get('/getOne/:id', student.getOne);


//export router
module.exports = router
