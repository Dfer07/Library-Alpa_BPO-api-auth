const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const boom = require('@hapi/boom')

class AutoresService {
  constructor() {
    //vacio
  }

  async createAutor(data) {
    const fechaNacimiento = data.fecha_nacimiento;
    if (fechaNacimiento) {
      data.fecha_nacimiento = new Date(fechaNacimiento);
    }
    const newAutor = await prisma.autores.create({ data });
    return { message: "Se creo un nuevo autor", data: newAutor };
  }

  async getAutores() {
    const autores = await prisma.autores.findMany(/* {include:{libros:{select:{titulo:true}}}} */);
    return autores;
  }

  async getAutor(id) {
    const autor = await prisma.autores.findUnique({ where: { id } });
    if (!autor) {
      throw boom.notFound("El id no existe en la base de datos");
    }
    return autor;
  }

  async updateAutor(id, data) {
    await this.getAutor(id);
    const fechaNacimiento = data.fecha_nacimiento;
    if (fechaNacimiento) {
      data.fecha_nacimiento = new Date(fechaNacimiento);
    }
    const updateAutor = await prisma.autores.update({ where: { id }, data });
    return {
      message: `El autor con id = ${id} fue actualizado`,
      data: updateAutor,
    };
  }

  async deleteAutor(id) {
    await this.getAutor(id);
    const deleteAutor = await prisma.autores.delete({ where: { id } });
    return { message: `El autor con id = ${id} fue eliminado` };
  }
}

module.exports = AutoresService;
