const mongoose = require("mongoose")

const RentSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true
        },
        rentId:{
            type: Number,
            required: true
        },
        street:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        bedRooms: {
            type: Number,
            required: true
        },
        halls: {
            type: Number,
            required: true
        },
        bathRooms: {
            type: Number,
            required: true
        },
        kitchens: {
            type: Number,
            required: true
        },
        otherDescription: {
            type: String,
            required: true
        },
        advance: {
            type: Number,
            required: true
        },
        pricePerMonth : {
            type: Number,
            required: true
        }
    }
)


const Rent = mongoose.model("rents", RentSchema);

module.exports = Rent