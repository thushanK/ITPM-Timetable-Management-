const express = require('express');
const router = express.Router();

const overlap = require('../controllers/overlap.controller');


//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

    // Create new  parallel session 
    router.post("/add", overlap.add );
       
    //Get all parallel sessions list
    router.get('/get' , overlap.get );

    //get one room
    // router.get('/getOne/:id', overlap.getOne);

    // //Delete selected group
    router.delete('/delete/:id' , overlap.delete );



//export router
module.exports = router
