
const express = require("express");

const shopController = require("../controllers/shopControllers.js");

const router = express.Router();

router.get('/$', shopController.products );
// router.get(/(\d+)$/, shopController.products );
// router.get(/([^/]+)$/, shopController.products );
// router.get(/\/(\d+)$/, shopController.products );
router.get('/product/:id', shopController.product );
router.post('/product/:id', shopController.productAdder );
router.get(/(\d+)$/, shopController.products );// /1/2  restrict other subroutes

router.get('/cart$', shopController.cart );


module.exports = router;