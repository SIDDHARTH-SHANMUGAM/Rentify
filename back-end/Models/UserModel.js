const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            unique: true
        },
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


const User = mongoose.model("users", UserSchema);

module.exports = User