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
const buildingRoute = require("./app/routes/building.route");
const lecturerRoute = require("./app/routes/lecturer.route");
const roomRoute = require("./app/routes/room.route");
const StudentRoute = require("./app/routes/student.route");
const TagRoute = require("./app/routes/Tag.route");
const WorkingDaysRoute = require("./app/routes/workingdays.route");
const subjectRoute = require("./app/routes/subject.route");
const statsRoute = require("./app/routes/stats.route");
const SessionRoute = require("./app/routes/sessions.route");
const Consecutive = require("./app/routes/consecutive.route");

const suitableRoute = require("./app/routes/Suitable.route");

const timeslot = require("./app/routes/timeslot.route");



const dbConfig = require("./config/db.config");




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

mongoose.set("useCreateIndex", true);

//set routes
app.use("/api/buildings", buildingRoute);
app.use("/api/lecturer", lecturerRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/student", StudentRoute);
app.use("/api/tag", TagRoute);
app.use("/api/workingdays", WorkingDaysRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/stats", statsRoute);
app.use("/api/session", SessionRoute);
app.use("/api/consession", Consecutive);
app.use("/api/suitable", suitableRoute);
app.use("/api/timeslot", timeslot);


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
        useFindAndModify: false,
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