const { Router } = require('express');
const router = Router();

const routerUser = require("./routerUser");
const routerProduct = require("./routerProduct");
const routerReview = require("./routerReview");
const routerPurchase = require("./routerPurchase");

router.use('/user', routerUser);
router.use('/product', routerProduct);
router.use('/review', routerReview);
router.use('/purchase', routerPurchase);

module.exports = router;