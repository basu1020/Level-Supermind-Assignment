const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET
const User = require('../models/userModel')

const fetchuser = async (req ,res ,next ) => {
    
    const token = req.header('auth-token') // taking the token in 'auth-token' header
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, secret) // verifying the token with our signature
        req.userId = data._id

        const userId = req.userId
        const user = await User.findByPk(userId)
        req.username = user.username

        next() 
    }
    catch (error){
        res.status(401).send({error : "Please authenticate using a valid tokenn"})
    }
}

module.exports = fetchuser