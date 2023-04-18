const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const object = require("./routes/styles.js")
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const cors = require('cors')
require('dotenv').config()
const secretKey = process.env.MI_SECRET_TOKEN;

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
app.use("/api/objects", object)
app.use('/api/dashboard', verifyToken)


app.get('/', (req, res) => {
  res.json({ mensaje: 'Base de datos' })
})
app.get('/recurso-protegido', (req, res) => {
  // Obtener el token JWT del encabezado de autorización
  const token = req.headers.authorization.split(' ')[1];

  // Verificar la validez del token
  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ mensaje: 'Acceso permitido al recurso protegido' });
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})