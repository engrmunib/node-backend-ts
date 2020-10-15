const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config({ path: ".env" });
const app = require("./App/app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log("failed", err);
  });

// mongoose.connect(process.env.LOCAL_DATABASE, 
//   {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
//   .then(() => console.log("Local DB connection successful!"))
//   .catch((err) => {
//     console.log("failed", err);
//   });

const port = process.env.PORT || 3000;
const server = app.listen( port, () => {
  console.log(`App running on port ${port}...`);
});
