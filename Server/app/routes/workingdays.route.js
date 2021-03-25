const express = require('express');
const router = express.Router();

const workingdays = require("../controllers/workingdays.controller");

// new Working days group
router.post("/add", workingdays.add);

//all working days group list
router.get('/get', workingdays.get);

//all working days group list single
router.get('/get/:id', workingdays.getsingle);

//Update the selected working day group
router.post('/update', workingdays.update);

//Delete the selected working day group
router.delete('/delete', workingdays.delete);


//export the router
module.exports = router