require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { Product } = require("../../models/Product"); 
const { User } = require("../../models/User"); 

require("../../db"); 

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const payment = new Preference(client);

const placeOrder = async (req, res) => {
  try {
    
    const cart = req.body;
    console.log(cart);

    let items = cart.map((product) => ({
      title: product.name,
      quantity: product.quantity,
      unit_price: product.price,
      currency_id: product.currency, 
      image: product.img,
      description: product.description,
    }));

    let preference = {
      items: items,
      back_urls: {
        failure: "http://localhost:3001",
        pending: "http://localhost:3001",
        success: "http://localhost:3001",
      },
      auto_return: "approved",
    };

    const response = await payment.create(preference);
    res.status(200).send(response);
    console.log(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const successfulPurchase = async (req, res) => {
  try {
 
    res.status(200).send("Purchase completed successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { placeOrder, successfulPurchase };