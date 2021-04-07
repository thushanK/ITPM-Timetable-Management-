const express = require('express');
const router = express.Router();


const subjectController = require('../controllers/subject.controller');

router.post("/add", subjectController.add_subject);

router.post("/edit", subjectController.edit_subject);

router.post("/delete", subjectController.delete_subject);
router.get("/all", subjectController.get_all);



router.get("/:id", subjectController.get_specific_subject);
router.post("/filter", subjectController.get_filtered);


module.exports = router
