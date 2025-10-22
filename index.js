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

async function findAllMeetUp() {
    try{
        const data = await Event.find();
        return data;
    }catch(error){
        throw error;
    }
}

app.get("/all", async(req, res) => {
    try{
        const event = await findAllMeetUp();
        if(event){
            res.status(200).json({message: "Events fetched successfully", event: event});
        }else{
            res.status(404).json({error: "Couldn't find any data"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server problem"});
    }
});

app.listen(PORT, () => {
    console.log("Listening to the port", PORT);
});