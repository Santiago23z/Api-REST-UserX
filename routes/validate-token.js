const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-tokens')
    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try {
        const verified = jwt.verify(token, process.env.MI_SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error){
        res.status(400).json({error: 'Token no valido, acceso denegado'})
    }
}

module.exports = verifyToken