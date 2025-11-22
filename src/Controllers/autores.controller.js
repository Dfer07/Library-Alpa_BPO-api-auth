const AutoresService = require("../services/autores.service");
const service = new AutoresService();

async function getAuthorController(req, res,next) {
  try {
    const autores = await service.getAutores();
    return res.status(200).json(autores);
  } catch (error) {
    return next(error)
  }
}

async function getAuthorIdController(req, res, next) {
  try {
    const { id } = req.params;
    // Buscar el autor con el ID proporcionado y lo envía en la respuesta
    const autor = await service.getAutor(Number(id));
    return res.status(200).json(autor);
  } catch (error) {
    return next(error)
  }
  // Extrae el ID del parámetro de la ruta
}

async function postAuthorController(req, res, next) {
  try {
    const info = req.body;
    const respuesta = await service.createAutor(info);
    return res.status(201).json(respuesta);
  } catch (error) {
    return next(error)
  }
}

async function putAuthorController(req, res, next) {
  try {
    // Extrae el ID del parámetro de la ruta y la información del cuerpo de la solicitud
    const { id } = req.params;
    const info = req.body;
    const autorActualizado = await service.updateAutor(Number(id), info);
    return res.status(200).json(autorActualizado);
  } catch (error) {
    console.log(error);
    return next(error)
  }
}

async function deleteAuthorController(req, res, next) {
  try {
    // Extrae el ID del URL
    const { id } = req.params;
    const autorDelete = await service.deleteAutor(Number(id));
    return res.status(200).json(autorDelete);
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAuthorController,
  getAuthorIdController,
  postAuthorController,
  putAuthorController,
  deleteAuthorController,
};
