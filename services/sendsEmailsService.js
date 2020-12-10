const MongoLib = require('../lib/mongo');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class sendsEmailsService {
    constructor() {
        this.collection = 'emailsSends';
        this.mongoDB = new MongoLib();
    }

    async getSends(idC) {
        //const query = tags && { tags: { $in: tags } };

        //const countSends = await this.mongoDB.emailsSends.find({'idCampaign':'125'}).count();
        const countSends = await this.mongoDB.emailsSends.find({'idCampaign':'125'}).count();
        
        return countSends;
    }
}


module.exports = sendsEmailsService;