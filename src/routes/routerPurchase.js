const { Router } = require("express");
const mercadoRouter = Router();

//Controllers
const {placeOrder, successfulPurchase} = require('../controllers/MercadoPago/mercadoController');
const getUserPurchase = require('../controllers/Purchase/getUserPurchase');

//POST
mercadoRouter.post("/order", placeOrder);


//GET
mercadoRouter.get("/succes", successfulPurchase);

mercadoRouter.get("/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userPurchases = await getUserPurchase(userId);
      
      res.status(200).json(userPurchases);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error.message });
    };
  }
);
module.exports = mercadoRouter;