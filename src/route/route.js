const express= require("express")
const router= express.Router()
const{createCustomer,getCustomer,deleteCustomer}= require("../controllers/customerController.js")
const{getAllCards,createCard}= require("../controllers/cardController.js")



router.post("/customer", createCustomer)
router.get("/customer", getCustomer)
router.delete("/customer", deleteCustomer)


router.post("/card", createCard)
router.get("/card", getAllCards)
router.all("/**", (req,res)=>{
    return res.status(404).send({status:false, msg:"The Api endpoint is not available"})
})


module.exports= router