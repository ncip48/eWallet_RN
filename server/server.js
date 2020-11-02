//load express
const express = require("express");
const app = express();

//load cors
const cors = require("cors");

//load dotenv
require("dotenv").config();

//include router
const router = require("./src/routes/router");

//define port number
const port = process.env.PORT || 5000;

//use json format
app.use(express.json());
//use cors
app.use(cors());
//use src/uploads/img as static
app.use("/src/uploads/img", express.static("src/uploads/img"));
//app.use("/src/uploads/books", express.static("src/uploads/books"));

//define router to /api/v1
app.use("/api/v1/", router);

//listen the server
app.listen(port, () => console.log(`Server running in port ${port}`));
