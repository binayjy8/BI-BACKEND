const express = require("express");
const { default: mongoose } = require("mongoose");

const meetUp = mongoose.Schema({
    title: {
        type: String,
    },
    eventType: {
        type: String,
        enum: ["Online Event", "Offline Event"],
    },
    dateTime: {
        type: Date,
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    location: {
        type: String,
    },
});