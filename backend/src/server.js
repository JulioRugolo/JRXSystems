require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const { prepareDatabase } = require('./utils/bootDatabase');

const PORT = process.env.PORT || 3001;

prepareDatabase(sequelize)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API JRX Systems em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao preparar o banco ou subir a API:', err.message);
    process.exit(1);
  });
