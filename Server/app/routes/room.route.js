const express = require('express');
const router = express.Router();

const roomController = require('./../controllers/room.controller');

router.post('/add', roomController.add);

router.get('/get', roomController.get);

router.post('/update', roomController.update);

router.delete('/delete/:id', roomController.delete);

router.get('/getOne/:id', roomController.getOne);

router.get('/getOneByName/:id', roomController.getOneByName);

module.exports = router