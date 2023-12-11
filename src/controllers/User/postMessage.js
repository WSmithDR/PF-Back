const Message = require('../../models/Message');

const postMessage = async ({ name, email, message }) => {
  try {
    if (!name || !message || !email) {
      throw new Error('Missing data');
    };

    const newMessage = new Message({
      name, 
      email, 
      message
    });

    const messageSaved = newMessage.save();

    if (messageSaved) {
      return "Mensaje enviado.";
    } else {
      throw new Error("No se pudo enviar el mensaje.")
    };
  } catch (error) {
    console.log(error);

    throw new Error(error.message)
  };
};

module.exports = postMessage;