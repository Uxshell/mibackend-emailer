const {response}=  require('express');
const Company = require('../models/companyModel');


const getCompanys = async(req, res = response)=>{
  
    //const listas = await Lista.find({IDUSER: filtroUser});
    //const listas = await Lista.find({IDUSER:'5f24405774598005a0e87b0e'});
    const cs = await Company.find();
    res.json({
        ok:true,
        cs
    });
}
const borrarCompany = async(req, res=response)=>{
    const id= req.params.id;
    try{
        const c = await Company.findById(id);
        if(!c){
            return res.status(404).json({
                ok:true,
                msg: 'Company no encontrada por id',
            });
        }
        await Company.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg: 'Company eliminada'
        })
       // this.cambiarBlacks(req);
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}


const crearCompany = async(req, res = response) => {


    //const uid = req.uid;
    const c = new Company(req.body);

    try {
        
        const companyDB = await c.save();
        

        res.json({
            ok: true,
            company: companyDB,
            msg: companyDB._id
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

module.exports={
    getCompanys,
    borrarCompany,
    
    crearCompany
}