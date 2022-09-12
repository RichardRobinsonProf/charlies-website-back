const mongoose = require("mongoose");
const User = require("./models/user");
const {connection} = require("./data/connection");


const user = new User({
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@gmail.com",
    language: "English",
    level: "Beginner",
    objective: "Conversation",
    exam: "IELTS",
    timeZone: "America/Argentina/Buenos_Aires",
    argentineTime: [],
    localTime: []
});

user.save().then(() => {
    console.log("User saved");
}).catch((err) => {
    console.log("Error saving user", err);
});