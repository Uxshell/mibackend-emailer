const { Schema, model } = require('mongoose');

const emailsRejectsSchema = Schema({
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
}, {  collection: 'emailsRejects' });


emailsRejectsSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'emailsRejects', emailsRejectsSchema );
