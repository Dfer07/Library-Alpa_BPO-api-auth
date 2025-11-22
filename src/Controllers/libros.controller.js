const e = require("express");
const LibrosService = require("../services/libros.service");
const service = new LibrosService();

async function getLibrosController(req, res, next) {
  try {
    const { disponible } = req.query; //capturo la query disponible
    if (disponible !== undefined) {
      //Si en la req.query.disponible es diferente de undefinded
      if(disponible === "false" || disponible === "true"){
        const disponibleBolean = disponible === "true"; // creamos un boleano a partir de la informacion en disponible
        const librosDisponibles = await service.getLibros(disponibleBolean); // buscamos los libros que en disponible tengan true o false dependiendo del boolean obtenido en la linea anterior
        return res.status(200).send(librosDisponibles);
      }
      throw boom.bad('Disponible no cuenta con ese valor')
    }
    const libros = await service.getLibros();
    //si disponible esta indefinido es decir undefined entonces no entre al if y pase directo a imprimir todos los libros (caso donde la url no tiene query)
    return res.status(200).json(libros);
  } catch (error) {
    return next(error)
  }
}

async function getLibrosNombreController(req, res, next) {
  try {
    const { titulo } = req.query;
    const libro = await service.getLibrosByTitle(titulo);
    return res.status(200).json(libro);
  } catch (error) {
    return next(error)
  }
}

async function getLibroController(req, res, next) {
  try {
    const { id } = req.params;
    const libro = await service.getLibro(Number(id));
    return res.status(200).json(libro);
  } catch (error) {
    return next(error)
  }
}

async function postLibroController(req, res, next) {
  try {
    const info = req.body;
    const newLibro = await service.createLibro(info);
    return res.status(201).json(newLibro);
  } catch (error) {
    return next(error)
  }
}

async function putLibroController(req, res, next) {
  try {
    const { id } = req.params;
    const info = req.body;
    const updateLibro = await service.updateLibro(Number(id), info);
    res.status(200).json(updateLibro);
  } catch (error) {
    return next(error)
  }
}

async function deleteLibroController(req, res, next) {
  try {
    const { id } = req.params;
    const libroDelete = await service.deleteLibro(Number(id));
    return res.status(200).json(libroDelete);
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getLibrosController,
  getLibrosNombreController,
  getLibroController,
  postLibroController,
  putLibroController,
  deleteLibroController,
};



