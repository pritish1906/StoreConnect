const router = require('express').Router()
const User = require('../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')



router.post('/register', async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
 
    })

    try{
        const savedUser = newUser.save();
        res.status(201).send(savedUser)
    }catch(err)
    {
        res.status(500).json(err)
    }
})


router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne(
            {username: req.body.username})
        !user && res.status(401).json("Wrong Credentiasl")

        const dpassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_KEY).toString(CryptoJs.enc.Utf8)

        dpassword !== req.body.password && res.status(401).json("Wrong Credentiasl")


        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            {expiresIn: "1d"}
        )

        const {password, ...others} = user._doc

        res.status(200).json({...others, accessToken})
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports = router