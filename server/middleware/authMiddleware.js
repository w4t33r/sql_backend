const jwt = require('jsonwebtoken')
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});

const secretKey = process.env.secret_key

module.exports = (req, res, next) => {
    if (req.methods === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log(token)
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth  Error'})
    }

}