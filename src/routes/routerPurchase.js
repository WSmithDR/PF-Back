const { Router } = require("express");
const mercadoRouter = Router();
const {placeOrder, successfulPurchase} = require('../controllers/MercadoPago/mercadoController');

mercadoRouter.post("/order", placeOrder);

mercadoRouter.get("/succes", successfulPurchase);

module.exports = mercadoRouter;