const express = require('express');
const router = express.Router();

const AllocateGroup = require('./../controllers/AllocateGroup.controller');


    router.post('/notavailable', AllocateGroup.notavailable);
    router.get('/get', AllocateGroup.get);
    router.delete('/delete/:id', AllocateGroup.delete);
module.exports = router