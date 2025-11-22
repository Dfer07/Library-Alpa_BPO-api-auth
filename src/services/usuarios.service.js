const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const boom = require('@hapi/boom')

class UserService{
    constructor(){
        //vacio
    }

    async findAllUsers(){
        const users = await prisma.usuarios.findMany({select:{id:true, email:true, rolId:true, rol:{select:{nombre:true}}}, orderBy:{id:'asc'}})
        return users
    }

    async findUserById(id){
        const user = await prisma.usuarios.findUnique({where:{id}, select:{id:true, email:true, rolId:true, rol:{select:{nombre:true}}}})
        if(!user){
            throw boom.notFound('No se encontro el usuario' )
        }
        return user
    }

    async deleteUser(id){
        await this.findUserById(id)
        const deletedUser = await prisma.usuarios.delete({where:{id}})
        return {message:`El usuario con id = ${id} fue eliminado`}
    }
}

module.exports = AdminService