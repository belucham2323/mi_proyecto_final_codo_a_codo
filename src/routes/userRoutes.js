
const express = require("express");

const userController = require("../controllers/userControllers.js")

const router = express.Router();

router.get('/login', userController.login );

router.post('/login', userController.loginProcess );

router.get('/logout', userController.logOutProcess );

router.get('/register', userController.register );

router.post('/register', userController.registerProcess );

module.exports = router;