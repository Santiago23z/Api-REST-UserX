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
    const usuarios = await syles.find({usr : req.user.id})

    res.json(usuarios)
    // res.send("hola")
})

router.get("/objectStyles:id", async (req, res) => {
    const id = await syles.findById(req.params.id)
    res.json(id)
})

router.delete("/objectStyles:id", async (req, res) => {
    
    await syles.findByIdAndDelete(req.params.id)
    res.json("datos borrados")
})


module.exports = router