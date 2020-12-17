const {response}=  require('express');
const Lista = require('../models/listaModel');



const getListas = async(req, res = response)=>{
    
    let user = req.body.userId;
  //  var userID = user.replace(/['"]+/g, '');
    //console.log('valor en el back de  req.userId ' +user);
    
    const listas = await Lista.find({userId:user});
    res.json({
        ok:true,
        listas
    });
    
}
const borrarLista = async(req, res=response)=>{
    const id= req.params.id;
    console.log("probando id lista"+id);
    try{
        const lista = await Lista.findById(id);
        if(!lista){
            return res.status(404).json({
                ok:true,
                msg: 'Lista no encontrada por id',
            });
        }
        await Lista.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg: 'Lista eliminada'
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
const cambiarBlacks = async(req, res = response) => {
    const id= req.params.id;
    const listas = await Lista.find(ID_LISTA= id).lean();
    console.log("CAMBIAR"+listas.length);
    res.json({
        ok:true,
        listas
    });
}
const buscarLista = async(req, res = response) => {

    const select= req.params.seleccionada;
    let s = req.body.seleccionada;
   
    console.log('valor de s'+s);
    const listaDB = await Lista.findOne({nombre:s});
     var IDL= listaDB._id;
    var listaResponse = {
                
        Id: listaDB._id
    }
    console.log("LISTA"+ listaResponse );
    res.json({
        ok:true,
        idlista:IDL
    });
}
const crearLista = async(req, res = response) => {


    //const uid = req.uid;
    const lista = new Lista(req.body);

    try {
        
        const listaDB = await lista.save();
        

        res.json({
            ok: true,
            lista: listaDB,
            msg: listaDB._id
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
    getListas,
    borrarLista,
    crearLista,
    buscarLista
}