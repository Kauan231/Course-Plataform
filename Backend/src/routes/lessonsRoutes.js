const { Router } = require('express');
const LessonsController = require('../controllers/lessonsController');

const router = Router();
const lessonsController = new LessonsController();

router.post('/courses/lessons', (req, res) => { lessonsController.Create(req, res); });
router.delete('/courses/:courseid/lessons/:id', (req, res) => { lessonsController.Delete(req, res); });
router.get('/courses/:courseid/lessons', (req, res) => { lessonsController.ReadById(req, res); });

module.exports = router;
