const mongoose = require('mongoose')
const { Schema } = mongoose
const bcryptjs = require('bcrypt')

const userSchema = new Schema({
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
    }
})

userSchema.methods.encryptPassword = async (pass) => {
   const salt = await  bcryptjs.genSalt(10);
   const hash = bcryptjs.hash(pass, salt)
   return hash;
};

userSchema.methods.matchPassword = async function(password) {
    return await bcryptjs.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)