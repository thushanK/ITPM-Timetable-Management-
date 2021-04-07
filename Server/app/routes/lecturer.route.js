const express = require('express');
const router = express.Router();

const lecturerController = require('../controllers/lecturer.controller');


router.post('/add', lecturerController.add_lecturer);
router.post("/edit", lecturerController.edit_lecturer);
router.post("/delete", lecturerController.delete_lecturer);
router.get("/all", lecturerController.get_all);


router.get("/:id", lecturerController.get_specific_lecturer);
router.get("/byid/:id", lecturerController.get_specific_lecturer_by_id);

router.post("/filter", lecturerController.get_filtered);


//export router
module.exports = router
