const { Schema, model } = require('mongoose');

const emailsDeliverysSchema = Schema({
    iDCampaign: {
        type: String,
        required: true
    },
   
    /*
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }*/
}, {  collection: 'emailsDeliverys' });


emailsDeliverysSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'emailsDelivery', emailsDeliverysSchema );
