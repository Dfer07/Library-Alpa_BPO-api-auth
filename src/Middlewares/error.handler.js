const {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} = require("@prisma/client");

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function prismaErrorHandler(err, req, res, next) {
  // Error en reglas UNIQUE (P2002)
  if (err instanceof PrismaClientKnownRequestError) {
    console.log(err)
    if (err.code === "P2002") {
      return res.status(409).json({
        statusCode: 409,
        message: "Fallo en la restrcción UNIQUE",
        target: err.meta.target,
      });
    }

    if (err.code === "P2003") {
      return res.status(409).json({
        statusCode: 409,
        message: "Fallo en la relación mediante la Foreign Key",
        field: err.meta,
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        statusCode: 404,
        message: "No se encontró resultados",
      });
    }
  }

  // Error de validación de argumentos (p.ej. enviar string donde esperaba número)
  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: "Error en el ingreso de datos",
    });
  }

  // Error al inicializar
  if (err instanceof PrismaClientInitializationError) {
    return res.status(500).json({
      statusCode: 500,
      message: "Error al iniciar el ORM PRISMA",
    });
  }

  // Si no es un error manejado arriba → pasa al manejador final
  next(err);
}

//funcion por defecto 500
function errorDefault(err, req, res, next) {
  console.log("entre al defecto")
  console.log(err)
  return res.status(500).json({err: err.message});
}

module.exports = {prismaErrorHandler, boomErrorHandler, errorDefault};
