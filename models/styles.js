const mongoose = require('mongoose');

const DatosUsuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    borders: {
        type: Number,
        required: true
    },
    layoutHorizontal: {
        type: String,
        required: true
    },
    layoutVertical: {
        type: String,
        required: true
    },
    layoutMode: {
        type: String,
        required: true
    },
    space_between: Number,
    padding_horizontal: Number,
    padding_vertical: Number,
    aligns: String,
    padLeft: Number,
    padtop: Number,
    bottomPad: Number,
    rightpad: Number,
    grids: [],
    colorsFill: [Number],
    opacityFill: String,
    strokeColor: [Number],
    opacityStroke: String,
    grosorStroke: String,
    positionStroke: String,
});

const DatosUsuario = mongoose.model('DatosUsuario', DatosUsuarioSchema);

module.exports = DatosUsuario;