const { Router } = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = Router();
const userController = new UserController();

router.post('/register', (req, res) => { userController.Register(req, res); });
router.post('/logout', (req, res) => { userController.Logout(req, res); });
router.post('/login', (req, res) => { userController.Login(req, res); });

router.get('/courses', authMiddleware, (req, res) => { userController.GetCourses(req, res); });

/*
router.post('/courses', (req, res) => { userController.addCourse(req, res); });
router.delete('/courses', (req, res) => { userController.removeCourse(req, res); });
*/

module.exports = router;
