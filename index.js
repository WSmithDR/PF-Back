const server = require('./src/app.js');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

try {
  server.listen(PORT, () => {
    console.log(`Server raised in: http://localhost:${PORT}`);
  })
} catch (error) {
  console.log(error);
};