const model = require("../models/styles")
const express = require('express');
const router = express.Router()


router.get('/recurso-protegido', (req, res) => {
   res.json({
    error : null,
    data : {
        title : "Bienvenido",
        user : req.user
    }
   })
});

router.post("/objectsStyles", async (req, res) => {
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
    const usuarios = await model.find({})

    res.json(usuarios)
})

module.exports = router