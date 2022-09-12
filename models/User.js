const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    createdAt: { 
        type: Date, 
        default: Date.now },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        trim: true,
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: "Please enter a valid email address"
        }
    },
    language: {
        type: String,
        required: true,
        enum: ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Rusian"]
    },
    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Pre-intermediate", "Intermediate", "Upper-intermediate" ,"Advanced"]
    },
    objective: {
        type: String,
        required: true,
        enum: ["Conversation", "Exam", "Business", "Other"]
    },
    exam: {
        trim: true,
        type: String,
        required: false,
    },
    timeZone: {
        type: Object,
        required: true,
    },
    argentineTime: {
        type: Array,
        required: true,
    },
    localTime: {
        type: Array,
        required: true,
    }
}); 

const User = mongoose.model("User", userSchema);

module.exports = User;