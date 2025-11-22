const boom = require('@hapi/boom');

function validatorHandler(schema, propiedad) {

    return (req, res, next) => { 

        const prop = req[propiedad]; //Se accede a una propieda de req (body, params, query) y se guarda en prop
        const {error} = schema.validate(prop, { abortEarly: false }); //Se valida que la prop cumpla con los requerimientos del esquema que se pasa como parametro
// si el error existe, entra al if
        if (error) {  
           return  next(boom.badRequest(error)); //Se manda el error al middleware de manejo de errores
        }
        return next();
}

}

module.exports = validatorHandler;