const syles = require("../models/styles")
const express = require('express');
const router = express.Router()



router.post("/objectStyles", async (req, res) => {
    try {
        const data = new syles(req.body);
        data.usr = req.user.id;
        
        const objectSaved = await data.save();

        res.json({ data: objectSaved });
    } catch (error) {
        res.status(400).send("No se pudo guardar");
    }
})

router.get("/objectStyles", async (req, res) => {
    const usuarios = await syles.find({})

    res.json(usuarios)
    // res.send("hola")
})


module.exports = router