const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const mongoose = require("mongoose");
var cors = require("cors");

// express app and cross origin request enable
const app = express();
app.use(cors());

// middleware
// it attaches and parses body data into req handler
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);


// listen for request
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests when connected with db

    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
