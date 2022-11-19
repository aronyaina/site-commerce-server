const mongoose = require("mongoose");

const Schema = mongoose.Schema()

const productSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    description: "String",
    price: {
        type: 'Integer',
        required: true
    }
})

module.exports = mongoose.models(productSchema)