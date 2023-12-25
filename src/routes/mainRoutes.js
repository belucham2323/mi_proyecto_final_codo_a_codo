
const express = require("express");

const mainControllers = require("../controllers/mainControllers.js")

const router = express.Router();

router.get('/', mainControllers.home );

router.get('/contact', mainControllers.contact );
router.post('/contact', mainControllers.contactPost );

module.exports = router;