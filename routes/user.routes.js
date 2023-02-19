const express = require("express")
const { userModel } = require("../model/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

userRouter.post("/register", async (req, res) => {
    const { email, name, pass } = (req.body)
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) res.send({ "msg": "Something went wrong", "error": err.message })
            else {
                const user = new userModel({ name, email, pass: hash })
                await user.save()
                res.send({ "msg": "New Users has been registerd" })
            }
        });

    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }

})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = (req.body)
    try {
        const user = await userModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")
                    res.send({ "msg": "Logged in ", "token": token })
                } else {
                    res.send({ "msg": "Wrong Credentials" })
                }

            });

        } else {
            res.send({ "msg": "wrong Creandentials" })
        }

    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })

    }

})


module.exports = {
    userRouter
}