const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    DOB: { type: Date, required: true },
    emailID: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true },
    customerID: { type: String, required: true, unique: true, trim: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", trim: true },
    isDeleted: { type: Boolean, default: false, trim: true }

}, { timestamps: true })


module.exports = mongoose.model("Customer", customerSchema)