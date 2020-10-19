import app from './app/app';
import db from './app/db';

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;

const server = app.listen( port, () => {
    console.log(`App running on port ${port}...`);
});

db.testConnection();
// db.migrateModelChanges();
