const Op = require('sequelize').Op;

const { Router } = require('express');
const CoursesController = require('../controllers/coursesController');

const router = Router();
const coursesController = new CoursesController();

router.post('/courses', (req, res) => { coursesController.Create(req, res); });
router.delete('/courses', (req, res) => { coursesController.Delete(req, res); });
router.get('/courses', (req, res) => { coursesController.Read(req, res, {  title: { [Op.like]: `${req.query.title}%` } } ); });


module.exports = router;
