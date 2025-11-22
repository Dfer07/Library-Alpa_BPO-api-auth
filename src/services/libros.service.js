const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const boom = require('@hapi/boom')

class LibrosService {
  constructor() {
    //vacio
  }

  async createLibro(data) {
    const libro = await prisma.libros.create({ data });
    const newLibro = await prisma.libros.findUnique({ where: { id:libro.id }, include:{ autor: { select: { id:true, nombre: true}}}})
    return { message: "Se creo un nuevo libro", data: newLibro };
  }

  async getLibros(disponible) {
    const libros = await prisma.libros.findMany({ 
      where: { disponible },
      include: { autor: true },
    });
    return libros;
  }

  async getLibro(id) {
    const libro = await prisma.libros.findUnique({
      where: { id },
      include: { autor: true },
    });
    if (!libro) {
      throw boom.notFound("El id del libro no existe en la BD");
    }
    return libro;
  }

  async updateLibro(id, data) {
    await this.getLibro(id);
    const updateLibro = await prisma.libros.update({ where: { id }, data });
    return {
      message: `El libro con id = ${id} fue actualizado`,
      data: updateLibro,
    };
  }

  async deleteLibro(id) {
    await this.getLibro(id)
    const deleteAutor = await prisma.libros.delete({ where: { id } });
    return { message: `El libro con id = ${id} fue eliminado` };
  }

  async getLibrosByTitle(titulo) {
    const libros = await this.getLibros();
    const librosPortitulo = libros.filter(libro => libro.titulo.toLocaleLowerCase().includes(titulo) === true)
    if(librosPortitulo.length===0){
        return {message: "No existen libros con esa palabra"}
    }
    return librosPortitulo;
  }
}

module.exports = LibrosService;
