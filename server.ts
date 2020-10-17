import app from './App/app';
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const db =  require("./App/db")
const port = process.env.PORT || 3000;

const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});

db.connectionTest();
// db.migrateModelChanges();

