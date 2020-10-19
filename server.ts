import app from './app/app';
import db from './app/db';

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;

const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});

db.connectionTest();
// db.migrateModelChanges();

