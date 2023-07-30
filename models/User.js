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
        enum: ["Beginner", "Pre-Intermediate", "Intermediate", "Upper-Intermediate" ,"Advanced"]
    },
    objective: {
        type: String,
        required: true,
        enum: ["Conversation", "Exam", "Business"]
    },
    phone: {
        type: String,
        required: true,
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
    },
    wantsGroup : {
        type: Boolean,
        required: false,
    },
    pricePack : {
        type: String,
        required: false,
        enum: ["Starter", "Pro", "Semi-pro"]
    },
    price: {
        type: String,
        required: false,
    },
    amountMonths: {
        type: String,
        required: false,
    },
    languageStudent: {
        type: String,
        required: false,
    }
}); 

const User = mongoose.model("User", userSchema);

module.exports = User;