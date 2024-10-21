const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.post('/signup',userControllers.signup);
router.post('/signin',userControllers.signin);

module.exports = router;