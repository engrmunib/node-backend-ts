const { Sequelize } = require('sequelize');

const {DATABASE, DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env;

const sequelize= new Sequelize(DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
  })

sequelize.connectionTest = async()=>{
    try {
        await sequelize.authenticate();
        console.log('DB Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;