const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please enter a username"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: [true, "Please enter a password"],
        trim: true,
    },
});

module.exports = mongoose.model("Admin", adminSchema); 