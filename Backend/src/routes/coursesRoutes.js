const { Router } = require('express');
const CoursesController = require('../controllers/coursesController');

const router = Router();
const coursesController = new CoursesController();

router.post('/course/create', (req, res) => { coursesController.Create(req, res); });
router.get('/course/read', (req, res) => { coursesController.Read(req, res); });

module.exports = router;
