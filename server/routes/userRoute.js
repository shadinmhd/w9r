const express = require("express")
const userModel = require("../models/userModel")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.get("/getUser", async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const username = jwt.verify(token, process.env.jwt_secret)
            const user = await userModel.findOne({name : username}, {_id: 0, name : 1, role : 1})
            res.send({
                success: true,
                user
            })
        }
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "some thing went wrong while getting use"
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.send({
                success: false,
                message: "fill all fields"
            })
        }

        const user = await userModel.findOne({ name: username }, { name: 1, password: 1, _id: 0 })
        if (!user) {
            return res.send({
                success: false,
                message: `user ${username} does not exist`
            })
        }

        if(user.password != password){
            return res.send({
                success : false,
                message : "incorrect username or password"
            })
        }
        const token = jwt.sign(username, process.env.jwt_secret)

        res.status(200).send({
            success: true,
            token : `Bearer ${token}`
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "some thing went wrong while logging in"
        })
    }
})

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            return res.send({
                success: false,
                message: "fill all fields"
            })
        }

        const searchUser = await userModel.findOne({ name: username })
        if (searchUser) {
            return res.send({
                success: false,
                message: `user ${username} allready exists please try loggin in`
            })
        }

        const emailSearch = await userModel.findOne({email})
        if(emailSearch){
            return res.send({
                success : false,
                message : "email all ready in use"
            })
        }


        await new userModel({
            name: username,
            password,
            email,
        }).save()

        res.send({
            success: true,
            message: `user ${username} created successfully`
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "some thign went wrong when registering user"
        })
    }
})

router.get("/getUser/:name", async (req, res) => {
    try {
        const user = await userModel.findOne({ name: req.params.name })
        if (!user) {
            return res.send({
                success: false,
                message: "user not found"
            })
        }
        res.send({
            success: true,
            user
        })
    } catch (err) {
        console.log(`${err}`.red.bold)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
})

module.exports = router