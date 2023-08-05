const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const colors = require("colors")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const connectDb = require("./config/connectDb")
connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())
app.use(morgan("dev"))

app.use(cors({
    origin : "*"
}))

app.use(session({
    secret : process.env.sess_secret,
    resave : false,
    saveUninitialized : true
}))


const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRotue")
const productRoute = require("./routes/productRoute")

app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/product", productRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server started http://localhost:${PORT}`.cyan.bold)
})