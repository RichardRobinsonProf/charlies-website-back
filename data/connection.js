const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Error connecting to database", err);
});

module.exports = {connection}