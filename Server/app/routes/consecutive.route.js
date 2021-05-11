const express = require('express');
const router = express.Router();

const conSession = require('../controllers/Consecutive.controller');



     router.post('/add', conSession.add );
     router.get('/get' , conSession.get );      
     router.get('/getOne/:id', conSession.getOne);
     router.delete('/delete/:id' , conSession.delete );
module.exports = router
