const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cartSchema = new Schema({
    status: "Boolean"
})

module.exports = mongoose.models(cartSchema)