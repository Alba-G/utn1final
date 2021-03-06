var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET novedades page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades()
  res.render('admin/novedades', {
      layout:'admin/layout',
      usuario:req.session.nombre,
      novedades
  });  
});

router.get('/agregar',(req, res, next) =>{
  res.render('admin/agregar',{
  layout:'admin/layout'
  })//cierra render
});//cierra get

router.post('/agregar', async (req, res, next) =>{
  try{
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedades(req.body);
      res.redirect('/admin/novedades')
    }else{
      res.render('admin/agregar',{
        layout:'admin/layout',
        error:true, message: 'Todos los campos son requeridos'
      });
    }
  }catch(error){
    console.log(error)
    res.render('admin/agregar',{
      layout:'admin/layout',
      error:true,message:'No se cargo la novedad'
    });//cierra render
  }//catch
});//cierra post

router.get('/eliminar/:id', async (req,res,next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesByID(id);
  res.redirect('/admin/novedades')
}); //cierra get de eliminar

//para modificar > traer datos 
router.get('/modificar/:id', async (req,res,next) => {
  var id = req.params.id;
  var novedades = await novedadesModel.getNovedadesById(id);
  res.render('admin/modificar',{
    layout:'admin/layout',
    novedades 
  });//cierro render
}); //cierro el modificar

// para actualizar los datos de la modificacion
router.post('/modificar', async (req,res,next) =>{
  try{
    console.log(obj)
    var obj={
      titulo:req.body.titulo,
      subtitulo:req.body.subtitulo,
      cuerpo:req.body.cuerpo
    }
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  }catch(error){
  console.log(error)
  res.render('admin/modificar', {
    layout:'admin/layout',
    error:true,message:'No se modico la novedad'
    })
  }
});



module.exports = router;