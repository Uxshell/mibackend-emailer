const { Schema, model } = require('mongoose');

const CompanySchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    /*
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }*/
}, {  collection: 'companys' });


CompanySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Company', CompanySchema );
