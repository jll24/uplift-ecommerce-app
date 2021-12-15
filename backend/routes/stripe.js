const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.post("/payment", (req,res)=> {
    stripe.charges.create({
        source: req.body.tokenId, // tokenId will come from Stripe when a payment was initiated
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes)=> {
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})


module.exports = router;