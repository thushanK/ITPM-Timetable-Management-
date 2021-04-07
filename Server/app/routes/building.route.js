const express = require('express');
const router = express.Router();

const buildingController = require('../controllers/building.controller');

router.post('/add', buildingController.add);

router.get('/get', buildingController.get);

router.post('/update', buildingController.update);

router.delete('/delete/:id', buildingController.delete);

router.get('/getOne/:id', buildingController.getOne);

module.exports = router