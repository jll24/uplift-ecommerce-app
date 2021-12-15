const router = require("express").Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js") // This is the package to encrypt passwords
const jwt = require("jsonwebtoken")

// ACCOUNT REGISTRATION
router.post("/register", async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: 
        CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD)
        .toString(),
    });

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch(err){
        res.status(500).json(err)
    }
})

// ACCOUNT LOGIN
router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne(
            {username: req.body.username}
        );
        !user && res.status(401).json("Incorrect username")
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, process.env.SECRET_PASSWORD
        )
        /* since the decrypted password will be returned as an object,
        we have to convert it into a string */
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        const inputPassword = req.body.password
        originalPassword !==req.body.password && 
            res.status(401).json("Incorrect password")
        
        const accessToken = jwt.sign(
        {
            id:user._id, 
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET_KEY,
            {expiresIn:"3d"}
        )
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router