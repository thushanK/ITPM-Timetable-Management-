const express = require('express');
const router = express.Router();
const timeslot = require("../controllers/timeslot.controller");

 
   router.post("/add", timeslot.add );   
   router.get('/get' , timeslot.get ); 
   router.get('/get/:id' , timeslot.getSingle );
   router.post('/update' , timeslot.update );
   router.delete('/delete' , timeslot.delete );
module.exports = router
