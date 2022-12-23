// const mongoose = require("mongoose")
// const moment = require("moment")
const cardModel = require("../models/cardModel.js")
const {isValidString, isValidNumber, isValidName, isValidCustomerId, isValidCardNumber } = require("../validation/validation.js")



exports.createCard = async (req, res) => {
    try {
        const data = req.body

        let { cardNumber, cardType, customerName, status, vision, customerID } = data

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data"
        })

        if (!cardNumber) return res.status(400).send({
            status: false,
            msg: "Please mention cardNumber"
        })

        if (!cardType) return res.status(400).send({
            status: false,
            msg: "Please mention cardType"
        })

        if (!customerName) return res.status(400).send({
            status: false,
            msg: "Please mention customerName"
        })

        if (!vision) return res.status(400).send({
            status: false,
            msg: "Please mention vision"
        })

        if (!customerID) return res.status(400).send({
            status: false,
            msg: "Please mention customerID"
        })

        // if(!status)return res.status(400).send({status:false, msg:"Please mention status"})

        if (!isValidString(cardNumber)) return res.status(400).send({
            status: false,
            msg: "cardNumber must be string. Example:--> 'C001' "
        })

        if (!isValidString(cardType)) return res.status(400).send({
            status: false,
            msg: "cardType must be string. Example:--> 'REGULAR/SPECIAL' "
        })

        if (!isValidString(customerName)) return res.status(400).send({
            status: false,
            msg: "customerName must be string. Example:--> 'Nishant Gautam' "
        })

        if (!isValidString(status)) return res.status(400).send({
            status: false,
            msg: "status must be string. Example:--> 'ACTIVE/INACTIVE' "
        })
        
        if (!isValidString(vision)) return res.status(400).send({
            status: false,
            msg: "vision must be string. Example:--> 'We inspire, educate and outfit for a lifetime of outdoor adventure and stewardship.' "
        })

        if (!isValidString(customerID)) return res.status(400).send({
            status: false,
            msg: "customerID must be string. Example:--> 'UUID' "
        })


        if (["REGULAR", "SPECIAL"].indexOf(cardType) == -1) return res.status(400).send({
            status: false,
            message: "Enter a valid cardType 'REGULAR' or 'SPECIAL' ",
        })

        if (["ACTIVE", "INACTIVE"].indexOf(status) == -1) return res.status(400).send({
            status: false,
            message: "Enter a valid status 'ACTIVE' or 'INACTIVE' ",
        })

        if (!isValidName(customerName)) return res.status(400).send({
            status: false,
            msg: "customerName is invalid. It must be like this:--> 'Nishant Gautam' "
        })

        if (!isValidNumber(cardNumber)) return res.status(400).send({
            status: false,
            msg: "cardNumber can't be a number"
        })

        if (!isValidNumber(vision)) return res.status(400).send({
            status: false,
            msg: "vision can't be a number"
        })

        if (!isValidNumber(customerID)) return res.status(400).send({
            status: false,
            msg: "customerID can't be a number"
        })
        if (!isValidCustomerId(customerID)) return res.status(400).send({
            status: false,
            msg: "customerID must be like:-- 'UUID'"
        })
        if (!isValidCardNumber(cardNumber)) return res.status(400).send({
            status: false,
            msg: "cardNumber must be like:-- 'C001' "
        })

        const registerCardNumber = await cardModel.find({ cardNumber: cardNumber })
        if (registerCardNumber.length != 0) return res.status(400).send({
            status: false,
            msg: "cardNumber is already registered"
        })

        const registerCustomerID = await cardModel.find({ customerID: customerID })
        if (registerCustomerID.length != 0) return res.status(400).send({
            status: false,
            msg: "customerID is already registered"
        })

        const saveData = await cardModel.create(data)
        return res.status(201).send({
            status: true,
            msg: "Card Created Successfully",
            data: saveData
        })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}


exports.getAllCards = async (req, res) => {
    try {
        const data = req.query
        const { status } = data
        const saveData = await cardModel.find({ status: status||"ACTIVE"})
        if (saveData.length == 0) return res.status(404).send({
            status: false,
            msg: "No data found"
        })
        else return res.status(200).send({
            status: true,
            msg: "All Card List",
            data: saveData
        })
    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}