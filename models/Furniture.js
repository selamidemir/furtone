const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const FurnitureSchema = Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        require: true,
        trim: true
    }
})

const Furniture = mongoose.model("Furniture", FurnitureSchema);

module.exports = Furniture;
