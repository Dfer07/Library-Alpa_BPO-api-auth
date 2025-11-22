const boom = require('@hapi/boom')

function chekcRoles(...roles){
    return (req, res, next) => {
        const user = req.user
        if(!roles.includes(user.rolId) && user.access === "login"){
            return next(boom.unauthorized("No autorizado"))
        }
        return next()
    }
}

module.exports = chekcRoles