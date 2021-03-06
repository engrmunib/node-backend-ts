import { Sequelize, Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
});

class sqlORM extends Sequelize {
    
    constructor(db: string, user: string, pass: string, options: Options) {
        super(db, user, pass, options);
    }

    testConnection = async () => {
        try {
            await sequelize.authenticate();
            console.log("DB Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    };

    migrateModelChanges = async () => {
        try {
            await sequelize.sync({
                alter: true
            });
            console.log("Migrated Model Changes to DB");
        } catch (error) {
            console.error("Unable to migrate Model changes:", error);
        }
    };
}

const {
    DATABASE,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT
} = process.env;

const sequelize = new sqlORM(DATABASE || '', DB_USER || '', DB_PASS || '', {
    host: DB_HOST || 'localhost',
    dialect: "mysql",
    port: Number(DB_PORT) || 3306,
    logging: false
});

export default sequelize;
