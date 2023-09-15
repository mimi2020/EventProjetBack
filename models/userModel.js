var { default: mongoose } = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({


    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
    },
    adress: {
        type: String,
    },
    phone: {
        type: Number,
    },
    cin: {
        type: String,
        required: true,
        unique: true
    },
    // role: {
    //     default: "user", type: String
    // },

    role: {
        default: "user", type: String
    },





},
    { timestamps: true })

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema)