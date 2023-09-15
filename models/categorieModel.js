var { default: mongoose, SchemaType, Schema } = require("mongoose")
const categorieSchema = new mongoose.Schema({


    name: {
        type: String,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    },
    budget: {
        type: String,
    },

    ListOfEvents:
        //[type: Schema.Types.ObjectId, ref: 'evenement']
        [{ type: Schema.Types.ObjectId, ref: 'evenement' }],



    type: {
        default: "event", type: String
    },

})
module.exports = mongoose.model("category", categorieSchema)
