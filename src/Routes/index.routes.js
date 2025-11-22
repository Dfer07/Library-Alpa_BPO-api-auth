const express = require('express');
const router = express.Router();
const autoresRouter = require('./autores.router');
const librosRouter = require('./libros.router');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');

function apiRoutes(app){
    app.use('/v1/api', router)
    router.use('/autores', autoresRouter)
    router.use('/libros', librosRouter)
    router.use('/auth', authRouter)
    router.use('/admin', adminRouter)
}

module.exports = apiRoutes


