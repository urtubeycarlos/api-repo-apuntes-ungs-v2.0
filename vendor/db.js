const Sequelize = require('sequelize');

const sequelize = new Sequelize('apuntesungs', 'urtubeyc', 'kiribati0510', {
  host: 'www.db4free.net',
  dialect: 'mysql'
});

sequelize.authenticate()

module.exports = sequelize;