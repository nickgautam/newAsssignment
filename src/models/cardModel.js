const mongoose = require("mongoose")
// const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({

    cardNumber: { type: String, required: true, unique: true },
    cardType: { type: String, required: true, enum: ["REGULAR", "SPECIAL"] },
    customerName: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    vision: { type: String, required: true },
    customerID: { type: String, required: true, unique: true },

}, { timestamps: true })


module.exports = mongoose.model("Card", cardSchema)
