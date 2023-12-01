require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

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

    let preference = {
      body: {
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
    console.log(res);
    res.redirect("http://localhost:5173/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { placeOrder, successfulPurchase };