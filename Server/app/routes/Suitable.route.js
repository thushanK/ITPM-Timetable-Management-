const express = require('express');
const router = express.Router();

const suitableController = require('./../controllers/Suitable.controller');

//add room
router.post('/add', suitableController.add);

router.post('/notavailable', suitableController.notavailable);

//add rooms for a lec
router.post('/forlec', suitableController.addRoomsForLec);

router.post('/forGroups', suitableController.addRoomsForGroups);

router.post('/forSubjects', suitableController.addRoomsForSubject);

router.get('/getAllSessions', suitableController.getAllSessions);

router.post('/forSessions', suitableController.addRoomsForSession);

router.get('/getConsecutive', suitableController.getConsecutive);

router.post('/forConSessions', suitableController.addRoomsForConSession);

module.exports = router