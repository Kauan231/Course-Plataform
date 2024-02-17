

const { Router } = require('express');
const CoursesController = require('../controllers/coursesController');

const router = Router();
const coursesController = new CoursesController();

router.get('/courses/search', (req, res) => { coursesController.ReadByTitle(req, res); }); 
router.get('/courses/:id', (req, res) => { coursesController.ReadById(req, res); }); 
router.delete('/courses/:id', (req, res) => { coursesController.Delete(req, res); });
router.post('/courses', (req, res) => { coursesController.Create(req, res); });


module.exports = router;
