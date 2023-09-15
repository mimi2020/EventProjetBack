const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const eventSchema = new mongoose.Schema({


    name: {
        type: String,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    },
    file: {
        type: String,
    },

    localisation: {
        type: String,
    },

    // organizer: { type: Schema.ObjectId },


    periode: {
        type: String,
    },

    budgetevent: {
        type: String,
    },

    price: {
        type: String,
    },

    equipement: [{ type: String }],
    tags: [{ type: String }],

    // type: {
    //     default: "event", type: String
    // },

    organizer: { type: mongoose.Schema.ObjectId, ref: "user" },
    category: { type: mongoose.Schema.ObjectId, ref: "category" },

})
module.exports = mongoose.model("event", eventSchema)