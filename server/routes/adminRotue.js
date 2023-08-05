const express = require("express")
const userModel = require("../models/userModel")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.get("/check", async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.send({
                success: false,
                message: "please login first"
            })
        }
        const token = req.headers.authorization.split(" ")[1]
        const username = jwt.verify(token, process.env.jwt_secret)
        const user = await userModel.findOne({ name: username }, { role: 1, _id: 0 })
        if (user.role == "admin") {
            res.send({
                success: true,
                message: "current user is an admin"
            })
        } else {
            res.send({
                success: false,
                message: "current user is not an admin"
            })
        }
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "failed to check user"
        })
    }
})

router.get("/getUsers", async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 })
        res.send({
            success: true,
            users
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: `something went wrong while getting user information`
        })
    }
})

router.post("/addUser", async (req, res) => {
    try {
        const { name, password, email, role } = req.body
        if (!name || !password || !email || !role) {
            return res.send({
                success: false,
                message: "please enter all fields"
            })
        }

        const searchUser = await userModel.findOne({ name })
        if (searchUser) {
            return res.send({
                success: false,
                message: "user all ready exists"
            })
        }

        const emailSearch = await userModel.findOne({ email })
        if (emailSearch) {
            return res.send({
                success: false,
                message: "email allready in use"
            })
        }


        await new userModel({
            name,
            email,
            password,
            role
        }).save()

        res.send({
            success: true,
            message: `user ${name} created successfully`
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong while createing new user"
        })
    }
})

router.put("/editUser", async (req, res) => {
    try {
        const { name, email, role, _id } = req.body
        if (!name || !email || !role) {
            return res.send({
                success: false,
                message: "please fill all fields"
            })
        }

        const searchUser = await userModel.findOne({ _id })
        if (!searchUser) {
            return res.send({
                success: false,
                message: "the user does not seem to exist"
            })
        }

        await userModel.updateOne({ _id }, { name, email, role })

        res.send({
            success: true,
            message: "user Edited successfully"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong while editing user"
        })
    }
})

router.delete("/deleteUser/:name", async (req, res) => {
    try {
        const searchUser = await userModel.findOne({ name: req.params.name })
        if (!searchUser) {
            return res.send({
                success: false,
                message: `user ${req.params.name} doesnt exist`
            })
        }
        await userModel.deleteOne({ name: req.params.name })

        res.send({
            success: true,
            message: "user deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "some thing went wrong while deleting user"
        })
    }
})

module.exports = router