const mongoose = require("mongoose");
const port = 3000;
const app = require("./app");
const marioModel = require("./models/marioChar");
mongoose.connect("mongodb://localhost/testaroo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => {
    console.log("connection established");
  })
  .on("connectionError", (err) => {
    console.log(err);
  });
// const getDataBase = async (newDataBase) => {
//   return await mongoose.createConnection(`mongodb://localhost/${newDataBase}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// const main = async () => {
//   const db = await getDataBase("testaroo");
//   console.log("DataBase is connected");
// };
// main();
app.listen(port, () => console.log(`App listening on port ${port}!`));
