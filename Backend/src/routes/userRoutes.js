const { Router } = require('express');
const UserController = require('../controllers/userController');
// const authMiddleware = require('../middlewares/auth');
const EnrollController = require('../controllers/enrollController');

const router = Router();
const userController = new UserController();
const enrollController = new EnrollController()

router.post('/register', (req, res) => { userController.Register(req, res); });
router.post('/logout', (req, res) => { userController.Logout(req, res); });
router.post('/login', (req, res) => { userController.Login(req, res); });

router.post('/user/enroll', (req, res) => { enrollController.Create(req, res); });
router.delete('/user/enroll', (req, res) => { enrollController.Delete(req, res); });
router.get('/user/:userid/courses', (req, res) => { enrollController.Read(req, res); });


/*
router.post('/courses', (req, res) => { userController.addCourse(req, res); });
router.delete('/courses', (req, res) => { userController.removeCourse(req, res); });
*/

module.exports = router;
