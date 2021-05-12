const express = require('express');
const router = express.Router();

const AllocateLec = require('./../controllers/AllocateLec.controller');
router.post('/notavailable', AllocateLec.notavailable);

router.get('/get', AllocateLec.get);
router.delete('/delete/:id', AllocateLec.delete);
module.exports = router