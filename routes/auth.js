const router = require('express').Router()
const User = require('../models/user')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const moment = require("moment")
const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

// Esquema del login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

// LOGIN
router.post('/login', async (req, res) => {
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})
    
    // Validaciond e existencia
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({error: 'Usuario no encontrado'})

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({error: 'Constraseña invalida'})

    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key' // Clave secreta para JWT

    const tokenExpiration = 14 * 24 * 60 * 60 // 14 días en segundos

    const payload = {
        id: user._id,
        iat : moment().unix(),
        exp : moment().add(tokenExpiration, "seconds").unix()
    }

    const token = jwt.sign(payload, secretKey)

    console.log(token);

    res.set('Authorization', `Bearer ${token}`);
    res.json({
        error: null,
        data: { token },
        message: 'Bienvenido'
    });
})


// REGISTER
router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save()
        res.json({
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.get("/register", async (req, res) => {
    const usuarios = await User.find({})

    res.json(usuarios)
})

module.exports = router