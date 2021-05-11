const express = require('express');
const router = express.Router();

const sessionController = require('./../controllers/Sessions.Controller');


router.post('/add', sessionController.add_session);


//get student stats
router.get('/get/allinfo', sessionController.all_info);
router.get('/all', sessionController.get_all_sessions);
router.post('/search', sessionController.get_filtered);
router.post('/delete', sessionController.delete_sessions);

module.exports = router;