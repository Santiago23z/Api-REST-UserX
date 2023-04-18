const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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
    date : {
        type : Date,
        default : Date.now
    }
})

userSchema.methods.ecryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
   const hash = bcrypt.hash(password, salt)
   return hash;
};

userSchema.methods.matchPassword = async  function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)