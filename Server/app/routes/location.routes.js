const express = require('express');
const router = express.Router();

const locationController = require('./../controllers/location.controller');

router.post('/add', locationController.add);

router.get('/get', locationController.get);

router.post('/update', locationController.update);

router.delete('/delete/:id', locationController.delete);

router.get('/getOne/:id', locationController.getOne);

router.get('/getOneByName/:id', locationController.getOneByName);

module.exports = router