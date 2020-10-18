import app from './App/app';
import db from './App/db';

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;

const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});

db.connectionTest();
// db.migrateModelChanges();

