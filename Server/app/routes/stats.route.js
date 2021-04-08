const express = require('express');
const router = express.Router();

const statsController = require('./../controllers/stats.controller');
router.get('/studentGroups', statsController.studentStats);
router.get('/lecStats', statsController.lecturerStats);
router.get('/subStats', statsController.subjectsStats);

module.exports = router;