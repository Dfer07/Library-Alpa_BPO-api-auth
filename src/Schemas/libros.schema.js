//Importo Joi para validación de esquemas
const Joi = require("joi");

//Definición de los esquemas de validación para autores
const id = Joi.number().integer()
const titulo = Joi.string();
const isbn = Joi.string();
const autorId = Joi.number().integer()
const añoPublicacion = Joi.number().integer().min(1800).max(new Date().getFullYear())
const genero = Joi.string()
const disponible = Joi.bool()

const getlibroSchema = Joi.object({
  id: id.required(),
});

const createlibroSchema = Joi.object({
  titulo: titulo.required(),
  isbn: isbn.required(),
  autor_id: autorId.required(),
  año_publicacion:añoPublicacion,
  genero: genero,
  disponible: disponible    
});

const updatelibroSchema = Joi.object({
  titulo: titulo,
  isbn: isbn,
  autor_id: autorId,
  año_publicacion:añoPublicacion,
  genero: genero,
  disponible: disponible  
});

module.exports = { getlibroSchema, createlibroSchema, updatelibroSchema };
