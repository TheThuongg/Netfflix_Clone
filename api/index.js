const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require('./routes');
dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL ||'mongodb+srv://admin:Thuonghang.22@mern-netflix.rnh3mmn.mongodb.net/netflix?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

//  Route init
route(app);
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/movies", movieRoute);
// app.use("/api/lists", listRoute);
const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Backend server is running! http://localhost:${5000}`);
});