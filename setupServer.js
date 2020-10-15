const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const db =  require("./App/db")

const migrateModelChanges = async()=>{
    console.log('Migrating Model Changes to Database')
    await db.sync({ force: true });
    console.log('Success')
}
migrateModelChanges();