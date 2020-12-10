const { Schema, model } = require('mongoose');

const emailsOpensSchema = Schema({
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
}, {  collection: 'emailsOpens' });


emailsOpensSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'emailsOpens', emailsOpensSchema );
