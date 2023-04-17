const syles = require("../models/styles")
const express = require('express');
const router = express.Router()

router.post("/objectsStyles", async (req, res) => {
  try {

    let userId = null;
    if (req.user) {
      userId = req.user._id;
    } // obtener el ID de usuario autenticado
    const newData = new syles({
      name: req.body.name,
      width: req.body.width,
      height: req.body.height,
      borders: req.body.borders,
      layoutHorizontal: req.body.layoutHorizontal,
      layoutVertical: req.body.layoutVertical,
      layoutMode: req.body.layoutMode,
      space_between: req.body.space_between,
      padding_horizontal: req.body.padding_horizontal,
      padding_vertical: req.body.padding_vertical,
      aligns: req.body.aligns,
      padLeft: req.body.padLeft,
      padtop: req.body.padtop,
      bottomPad: req.body.bottomPad,
      rightpad: req.body.rightpad,
      grids: req.body.grids,
      colorsFill: req.body.colorsFill,
      opacityFill: req.body.opacityFill,
      strokeColor: req.body.strokeColor,
      opacityStroke: req.body.opacityStroke,
      grosorStroke: req.body.grosorStroke,
      positionStroke: req.body.positionStroke,
      user: userId // asignar el ID de usuario autenticado al campo "user"
    });
    const savedData = await newData.save();

    res.json({
      data: savedData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar los datos");
  }
})

router.get("/objectStyles", async (req, res) => {
  const usuarios = await syles.find({})

  res.json(usuarios)
})

module.exports = router