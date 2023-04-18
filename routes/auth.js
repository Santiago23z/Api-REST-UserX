const express = require('express');
const router = express.Router()
const User = require('../models/user');
const passport = require('passport');

router.post("/usr/signUp", async (req, res) => {
    console.log(req.body);
    const { name, email, password, confirm_Password  } = req.body
    console.log(name, email, password, confirm_Password);
    const errors = []
  

    if (name.length < 4) {
        errors.push({Text : "Name must be greather than 4 characters"})
    }

    if (errors.length > 0) {
        console.log("Hay errores");
        console.log(errors);
    } else {
        const Useremail =  await User.findOne({email : email})
        if (Useremail) {
            console.log("Email en uso");
        }
        const newUser = new User({name, email, password})
        newUser.password = await newUser.ecryptPassword(password)
        await newUser.save()
    }
})

router.post("/usr/signIN", passport.authenticate("local"), (req, res) => {
    
})

module.exports = router