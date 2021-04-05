const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const env = require('dotenv');

var port = process.env.PORT || 4000;
const MongoClient = require("mongodb").MongoClient;


//routes
const locationsRoute = locationsroute = require("./app/routes/Building.routes")


const dbConfig = require("./config/db.config");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

mongoose.set("useCreateIndex", true);

//set routes
app.use("/api/locations", locationsRoute);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false ,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database now");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });


app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
