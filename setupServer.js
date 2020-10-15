const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = require("./App/app");
const db =  require("./App/db")