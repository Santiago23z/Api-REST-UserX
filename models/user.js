const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type : String,
        require: true
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },

    confirm_password : {
        type : String,
        require: true,
        minlength : 6
    },

    date : {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model('User', userSchema)