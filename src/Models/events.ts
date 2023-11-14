import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    stack: { type: String, required: true},
    event: {type: String, required: true },
    location: { type: String, required: true  },
    date: { type: String, required: true },
    platform: { type: String, required: true }
})