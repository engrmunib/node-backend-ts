const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
const app = require("./App/app");

const port = process.env.PORT || 3000;

const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});

const {DATABASE, DB_USER, DB_PASS, DB_HOST} = process.env;

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql'
}).then(() =>{
  console.log(`DB CONNECTION SUCCESSFUL with ${DATABASE}`)
});