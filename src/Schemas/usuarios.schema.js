//Importo Joi para validación de esquemas
const Joi = require("joi");

//Definición de los esquemas de validación para autores
const id = Joi.number().integer()
const email = Joi.string().email();
const contraseña = Joi.string();
const rolId = Joi.number().integer()
const token = Joi.string()

const getUsuariosSchema = Joi.object({
  id: id.required(),
});

const createUsuariosSchema = Joi.object({
  email: email.required(),
  contraseña: contraseña.required(),
});

const createUsuariosSchemaAdmin = Joi.object({
  email: email.required(),
  contraseña: contraseña.required(),
  rolId: rolId.required()
});

const updateUsuariosSchema = Joi.object({
  rolId: rolId
});

const validateEmailSchema = Joi.object({
  email: email.required(),
});

const createNewPasswordSchema = Joi.object({
  token: token.required(),
  contraseña: contraseña.required(),
});
module.exports = { getUsuariosSchema, createUsuariosSchema, updateUsuariosSchema, createUsuariosSchemaAdmin, validateEmailSchema, createNewPasswordSchema };
