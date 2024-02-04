const { Router } = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = Router();
const userController = new UserController();

router.post('/register', (req, res) => { userController.register(req, res); });
router.post('/logout', (req, res) => { userController.logout(req, res); });
router.post('/login', (req, res) => { userController.login(req, res); });

router.get('/courses', authMiddleware, (req, res) => { userController.getCourses(req, res); });

/*
router.post('/courses', (req, res) => { userController.addCourse(req, res); });
router.delete('/courses', (req, res) => { userController.removeCourse(req, res); });
*/

module.exports = router;
