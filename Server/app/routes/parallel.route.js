const express = require('express');
const router = express.Router();

const Parallel = require('../controllers/parallel.controller');


//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

    // Create new  parallel session 
    router.post("/add", Parallel.add );
       
    //Get all parallel sessions list
    router.get('/get' , Parallel.get );

    //Delete selected group
    router.delete('/delete/:id' , Parallel.delete );

    //get one room
    router.get('/getOne/:id', Parallel.getOne);




//export router
module.exports = router
