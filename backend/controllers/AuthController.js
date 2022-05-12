// backend login authentication
const User = require("../models/User");
const {model} = require("mongoose");

function login(req, res) {
    const {email, password} = req.body;
    console.log(email, password);
    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        if (!user) {
            return res.status(404).json({
                message: "User not found, verify your email or create an account"
            })
        }
        if (user.password === password) {
            return res.status(200).json({
                message: "Login successful",
                data: user
            })
        } else {
            return res.status(401).json({
                message: "Wrong password"

            })
        }
    })
}

module.exports = {
    login
}