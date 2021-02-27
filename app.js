const express = require("express");
const app = express();
const routers = require("./Routers/index");
const DatabaseConnection = require(".//Helpers/Database//ConnectDB");
const CustomError = require("./Middlewares/ErrorHandle/CustomErrorHandler");

require("dotenv").config({
  path: "./config/env/config.env",
});

app.use(express.json());

DatabaseConnection();

app.use("/", routers);

app.use(CustomError);

app.listen(process.env.PORT, () => {
  console.log("Port listening!");
});
