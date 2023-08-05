const mongoose = require("mongoose")

function connectDb(){
    try{
        mongoose.connect(process.env.db)
        console.log(`success fully connected to database`.cyan.bold)
    }catch(err){
        console.log(`error connecting database: ${err}`.red.bold)
    }
}

module.exports = connectDb