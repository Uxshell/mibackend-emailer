const MongoLib = require('../lib/mongo');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class CompanyService {
    constructor() {
        this.collection = 'companys';
        this.mongoDB = new MongoLib();
    }
async searchCompany({ user }) {
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
}

module.exports = CompanyService;