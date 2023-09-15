const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const reservationSchema = new mongoose.Schema({




    idClient: { type: mongoose.Schema.ObjectId, ref: "user" },
    idEvent: { type: mongoose.Schema.ObjectId, ref: "event" },

})
module.exports = mongoose.model("reservation", reservationSchema)