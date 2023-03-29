const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const cors = require('cors')
require('dotenv').config()

const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.izrjkfa.mongodb.net/${process.env.DB}retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("db is connect"))
    .catch((e) => console.log(e))

var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}

const app = express()

var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio de nuestro front
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)


app.get('/', (req, res) => {
  res.json({ mensaje: 'Base de datos conectada' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
