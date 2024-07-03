require("dotenv").config();
const express = require ("express");
const app = express();
const mongoose = require("mongoose");
require("./DataBase/Connection");
const Products = require("./Models/ProductSchema");
const DefaultData = require("./DefaultData");
const cors= require("cors");
const router = require("./Routes/router");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = process.env.PORT || 8005;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("amazon/build"))
}

app.listen(port,()=>{
    console.log("server is running");
});

DefaultData();