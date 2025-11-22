const express = require("express"); // Importa el módulo Express
const router = express.Router(); // Crea un enrutador de Express
const validatorHandler = require("../Middlewares/validator.handler"); // Importa el middleware de validación{
const {
  getAutorSchema,
  createAutorSchema,
  updateAutorSchema,
} = require("../Schemas/autores.schema"); // Importa los esquemas de validación para autores
const {
  getAuthorController,
  getAuthorIdController,
  postAuthorController,
  putAuthorController,
  deleteAuthorController,
} = require("../Controllers/autores.controller");
const passport = require('passport')
const chekcRoles = require('../Middlewares/auth.handler')

//ENDPOINT PARA AUTORES

// Define una ruta GET para '/api/autores'
router.get("/",
  passport.authenticate('jwt', {session:false}),
  getAuthorController);

//EDNPOINT PARA UN AUTOR ESPECÍFICO
router.get(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getAutorSchema, "params"),
  getAuthorIdController
);

//ENDPOINT CREAR UN NUEVO AUTOR
router.post(
  "/",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 es admin y 3 es empelado
  validatorHandler(createAutorSchema, "body"),
  postAuthorController
);

//ENDPOINT ACTUALIZAR UN AUTOR
router.put(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 es admin y 3 es empelado
  validatorHandler(getAutorSchema, "params"),
  validatorHandler(updateAutorSchema, "body"),
  putAuthorController
);

//ENDPOINT ELIMINAR UN AUTOR
router.delete(
  "/:id",
  passport.authenticate('jwt', {session:false}),
  chekcRoles(1,3), // 1 es admin y 3 es empelado
  validatorHandler(getAutorSchema, "params"),
  deleteAuthorController
);

module.exports = router; // Exporta el enrutador para usarlo en otros archivos
