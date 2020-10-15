const dotenv = require("dotenv");


dotenv.config({ path: ".env" });
const app = require("./App/app");

const port = process.env.PORT || 3000;
const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});
