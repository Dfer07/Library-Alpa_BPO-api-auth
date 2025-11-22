const express = require('express')
const app = express()
const apiRoutes = require('./Routes/index.routes')
const {prismaErrorHandler, boomErrorHandler, errorDefault} = require('./Middlewares/error.handler')
app.use(express.json());
const passport  = require('./utils/auth/')
app.use(passport.initialize())



apiRoutes(app)

app.get('/', (req, res) => {
  res.send('Hola Mundo!')
});

app.use(prismaErrorHandler)
app.use(boomErrorHandler)
app.use(errorDefault)


module.exports = app