const express = require('express');
const router = express.Router();

const AllocateSession = require('./../controllers/AllocateSession.controller');
router.post('/notavailable', AllocateSession.notavailable);
router.get('/get', AllocateSession.get);
router.delete('/delete/:id', AllocateSession.delete);

module.exports = router