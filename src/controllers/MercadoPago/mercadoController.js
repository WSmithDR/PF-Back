require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require("../../models/User");
const Product = require("../../models/Product");

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'electronicecommercepf@gmail.com',
    pass: 'paev oxfq udun bumb'
  }
};

const transporter = nodemailer.createTransport(config);

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});
const payment = new Preference(client);
const placeOrder = async (req, res) => {
  try {
   
    const cart = req.body;
    console.log(cart);

    let items = cart.map((product) => ({
      title: product.title,
      quantity: product.quantity,
      unit_price: product.unit_price,
      currency_id: product.currency_id,
      image: product.image,
      description: product.description,
    }));

    const userId = cart.reduce((foundUserId, item) => {
      return foundUserId || (item.userId ? item.userId : null);
    }, null);

    if (!userId) {
      throw new Error('User ID not found in the cart.');
    }

    const productIds = cart.map((item) => item.productId);

    let preference = {
      body: {
        external_reference: {userId: userId, productIds: productIds},
        items: items,
        back_urls: {
          failure: "http://localhost:3001",
          pending: "http://localhost:3001/purchase/pending",
          success: "http://localhost:3001/purchase/succes",
        },
        auto_return: "approved",
      },
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
    const { status, external_reference } = req.query;

    const datos = JSON.parse(external_reference);

    console.log(datos);

    const userId = datos.userId;
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: datos.productsId }); 
    if (!user) {
      throw new Error('User not found.');
    }

    const userEmail = user.email;

    await Product.findByIdAndUpdate(datos.productsId, { $inc: { quantity: -1 } });
    console.log(userEmail);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Gracias por tu compra",
      text: "Te invitamos a seguir comprando",
    });

    res.redirect('http://localhost:5173/');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { placeOrder, successfulPurchase };