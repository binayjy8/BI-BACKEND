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

app.get("/events", async(req, res) => {
    try{
        const event = await findAllMeetUp();
        if(event.length !== 0){
            res.status(200).json({message: "Events fetched successfully", event: event});
        }else{
            res.status(404).json({error: "Couldn't find any data"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server problem"});
    }
});

async function findByTite(meetupTitle) {
    try{
        const event = await Event.findOne({title: meetupTitle});
        return event;
        }catch(error){
        throw error;
    }
}

app.get("/events/:title", async(req, res) => {
    try{
        const event = await findByTite(req.params.title);
        if(event){
            res.status(200).json({message: "Event get successfully", event: event});
        }else{
            res.status(404).json({error: "Not get any event"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server problem"})
    }
});

async function updateOne(name, updatedData){
    try{
        const data = await Event.findOneAndUpdate({title: name}, updatedData,{new: true})
        return data;
    }catch(error){
        throw error;
    }
}

app.post("/events/:title", async(req, res) => {
    try{
        const title = req.params.title;
        const updatedData = req.body;
        const event = await updateOne(title, updatedData);
        if(event){
            res.status(200).json({message: "Updated successfully", event: event});
        }else{
            res.status(404).json({error: "Didn't updated"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server problem"});
    }
});

async function getById(eventId){
    try{
        const event = await Event.findById(eventId);
        return event;
    }catch(error){
        throw error;
    }
}

app.get("/events/env/:eventId", async(req, res) => {
    try{
        const event = await getById(req.params.eventId);
        if(event.length !== 0){
            res.status(200).json({message: "Event fetch successfully", event: event});
        }else{
            res.status(404).json({error: "Event not found"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server problem"});
    }
});

app.listen(PORT, () => {
    console.log("Listening to the port", PORT);
});