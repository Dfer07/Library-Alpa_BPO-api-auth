const express = require("express"); // Importa el módulo Express
const router = express.Router();
const validatorHandler = require("../Middlewares/validator.handler");
const {
  getlibroSchema,
  createlibroSchema,
  updatelibroSchema,
} = require("../Schemas/libros.schema");
const {
  getLibrosController,
  getLibrosNombreController,
  getLibroController,
  postLibroController,
  putLibroController,
  deleteLibroController,
} = require("../Controllers/libros.controller");
const passport = require('passport')
const chekcRoles = require('../Middlewares/auth.handler')

//ENDPOINT PARA LIBROS
router.get(
  "/",
  passport.authenticate('jwt', {session:false}), 
  getLibrosController);

//ENDPOINT PARA BUSCAR LIBRO POR NOMBRE
router.get(
  "/buscar",
  passport.authenticate('jwt', {session:false}),
  getLibrosNombreController);

//ENDPOINT PARA UN LIBRO ESPECÍFICO
router.get(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getlibroSchema, "params"),
  getLibroController
);

//ENDPOINT CREAR UN NUEVO LIBRO
router.post(
  "/",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 admin, 3 empleado
  validatorHandler(createlibroSchema, "body"),
  postLibroController
);

//ENDPOINT PARA ACTUALIZAR LIBROS
router.put(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 admin, 3 empleado
  validatorHandler(getlibroSchema, "params"),
  validatorHandler(updatelibroSchema, "body"),
  putLibroController
);

//ENDOPOINT PARA BORRAR UN LIBRO
router.delete(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 admin, 3 empleado
  validatorHandler(getlibroSchema, "params"),
  deleteLibroController
);

module.exports = router;
