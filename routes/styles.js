const syles = require("../models/styles")
const express = require('express');
const router = express.Router()

router.get("/objectStyles", async (req, res) => {
    const usuarios = await syles.find({user : req.user.id})

    res.json(usuarios)
    // res.send("hola")
})

module.exports = router