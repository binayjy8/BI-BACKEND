const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const { initializeDatabase } = require("./DB/db.connect");
const Event = require("./models/meetup");

const corsOptions = {
    origin: "*",
    credential: true,
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();