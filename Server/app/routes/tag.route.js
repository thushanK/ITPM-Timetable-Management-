const express = require('express');
const router = express.Router();

const Tag = require('../controllers/Tag.controller');






 
  
  router.post('/add', Tag.add );
       
 
  router.get('/get' , Tag.get );


  router.post('/update' , Tag.update );


  router.delete('/delete/:id' , Tag.delete );


      router.get('/getOne/:id', Tag.getOne);




module.exports = router
