
const AdminService = require('../services/admin.service')
const service = new AdminService()

async function getUsersController(req, res, next){
    try {
        const users = await service.findAllUsers()
        return res.status(200).json(users)
    } catch (error) {
        return next(error)
    }
}

async function getUserByIdController(req, res, next){
    try {
        const {id} = req.params
        const user = await service.findUserById(Number(id))
        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }
}

async function deleteUserController(req, res, next){
    try {
        const {id} = req.params
        const response = await service.deleteUser(Number(id))
        return res.status(200).json(response)
    } catch (error) {
        return next(error)
    }
}

module.exports =  { getUsersController, getUserByIdController, deleteUserController }