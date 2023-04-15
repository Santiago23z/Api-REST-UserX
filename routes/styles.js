const syles = require("../models/styles")
const express = require('express');
const router = express.Router()

router.post("/objectsStyles", async (req, res) => {
    try {
      const data = new syles({
        styleName: req.body.styleName,
        user: req.body.userId,
      });
  
      const objetsAVED = await data.save();
  
      res.json({
        data: objetsAVED,
      });
    } catch (error) {
      res.status(400).send("No se pudo guardar");
    }
});

router.get("/objectStyles", async (req, res) => {
    const usuarios = await syles.find({})
    res.render
    res.json(usuarios)
})

module.exports = router