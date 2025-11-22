const express = require("express");
const router = express.Router();
const {
  postLoginController,
  postRegistroController,
  postRecoveryPasswordController,
  postChangePasswordController
} = require("../Controllers/auth.controller");
const passport = require("passport");
const validatorHandler = require("../Middlewares/validator.handler");
const { createUsuariosSchema, createNewPasswordSchema, validateEmailSchema } = require("../Schemas/usuarios.schema");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  postLoginController
);

router.post(
  "/registro",
  validatorHandler(createUsuariosSchema, "body"),
  postRegistroController
);

router.post(
  '/recovery',
  validatorHandler(validateEmailSchema,'body'),
  postRecoveryPasswordController
);


router.post(
  '/change-password',
  validatorHandler(createNewPasswordSchema, 'body'),
  postChangePasswordController
);


module.exports = router;

