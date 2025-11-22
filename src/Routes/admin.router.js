const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const chekcRoles = require('../Middlewares/auth.handler');
const {postRegistroController} = require('../Controllers/auth.controller');
const {getUsersController, getUserByIdController, deleteUserController} = require('../Controllers/admin.controller');
const validatorHandler = require('../Middlewares/validator.handler');
const {getUsuariosSchema} = require('../Schemas/usuarios.schema');
const {createUsuariosSchemaAdmin } = require('../Schemas/usuarios.schema');

router.post(
    '/create-employee',
    passport.authenticate('jwt', {session:false}),
    validatorHandler(createUsuariosSchemaAdmin, 'body'),
    chekcRoles(1),
    postRegistroController
);

router.get(
    '/users',
    passport.authenticate('jwt', {session:false}),
    chekcRoles(1),
    getUsersController
)

router.get(
    '/users/:id',
    passport.authenticate('jwt', {session:false}),
    chekcRoles(1),
    validatorHandler(getUsuariosSchema, 'params'),
    getUserByIdController
)

router.delete(
    '/users/:id',
    passport.authenticate('jwt', {session:false}),
    chekcRoles(1),
    validatorHandler(getUsuariosSchema, 'params'),
    deleteUserController
);

module.exports = router;