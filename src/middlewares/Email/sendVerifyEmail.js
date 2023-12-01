const nodemailer = require('nodemailer');

const sendVerifyEmail = async (email, userId) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'electronicecommercepf@gmail.com',
      pass: 'paev oxfq udun bumb'
    }
  };

  const transport = nodemailer.createTransport(config);

  const verificationLink = `http://localhost:3001/user/verify/${userId}`;

  const message = {
    from: 'electronicecommercepf@gmail.com',
    to: email,
    subject: 'Verificación de usuario',
    text: `Da clic en el siguiente enlace para confirmar tu cuenta: ${verificationLink}`,
    html: `      
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
              padding: 20px;
              background-color: #f8f8f8;
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
              margin-bottom: 20px;
            }
            a {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Verificación de correo electrónico</h1>
            <p>¡Gracias por registrarte en nuestro sitio! Para completar la verificación de tu cuenta, haz clic en el siguiente <a href="${verificationLink}">enlace</a> </p>
          </div>
        </body>
      </html>`
  };

  const info = await transport.sendMail(message);
};

module.exports = sendVerifyEmail;
