const express = require('express');
const router = express.Router();

const Parallel = require('../controllers/parallel.controller');




  
    router.post("/add", Parallel.add );
       
    
    router.get('/get' , Parallel.get );

    
    router.delete('/delete/:id' , Parallel.delete );

    
    router.get('/getOne/:id', Parallel.getOne);





module.exports = router
