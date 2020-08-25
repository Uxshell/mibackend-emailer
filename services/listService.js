const MongoLib = require('../lib/mongo');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class ListaService {
    constructor() {
        this.collection = 'lists';
        this.mongoDB = new MongoLib();
    }
    



    async getLists({ tags }) {
        const query = tags && { tags: { $in: tags } };

        const listas = await this.mongoDB.getAll(this.collection, query);
        return listas;
    }

    async getList({ listaId }) {
        const lista = await this.mongoDB.get(this.collection, listaId);
        return lista;
    }

    async getUserById({ user }) {
        var query = { email: user.email };
        var userDB = await this.mongoDB.getOne(this.collection, query);
        if (userDB === null) {
            console.log("//user don't found");
            return {
                success: false,
                err: {
                    message: "No Existe el usuario"
                }
            }
        } else {
            var userResponse = {
                userId: userDB._id,
                name: userDB.name,
                email: user.email,
                rol: userDB.rol
            }

            return {
                success: true,
                user: userResponse,
            }

        }
    }

    
    async createList({ lista }) {
        //var salt = bcrypt.genSaltSync(10);
        //var hash = bcrypt.hashSync(user.password, salt);
        //user.password = hash;
        const newList = await this.mongoDB.create(this.collection, lista);
        return newList;
    }

    async updateList({ listaId, lista } = {}) {
        
        const updateList = await this.mongoDB.update(this.collection, listaId, lista);
        return updateList;
    }

    



}


module.exports = ListaService;