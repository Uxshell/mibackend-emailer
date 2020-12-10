const MongoLib = require('../lib/mongo');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');


class CampaignService {
    constructor() {
        this.collection = 'campaigns';
        this.mongoDB = new MongoLib();
    }

    async getCampaigns(query) {
        //const query = tags && { tags: { $in: tags } };

        const campaigns = await this.mongoDB.getAll(this.collection, query);
        return campaigns;
    }

    async createCampaign({ campaign }) {
        const newCampaign = await this.mongoDB.create(this.collection, campaign);
        return newCampaign;
    }
    async updateCampaign({campaign}){
        let IDC= campaign.IDC;
        const updaCampaign = await this.mongoDB.update(this.collection, IDC, campaign);
        return updaCampaign;
    }

    
  


}


module.exports = CampaignService;