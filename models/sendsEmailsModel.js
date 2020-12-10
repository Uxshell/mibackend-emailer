const { Schema, model } = require('mongoose');

const emailsSendsSchema = Schema({
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
}, {  collection: 'emailsSends' });


emailsSendsSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'emailsSends', emailsSendsSchema );
