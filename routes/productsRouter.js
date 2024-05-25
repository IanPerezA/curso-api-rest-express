const express = require('express');
const {faker, tr, ne} = require('@faker-js/faker');
const validadorHandler= require('./../middlewares/validador-handler');
const {getProductSchema,createProductSchema,updateProductSchema} = require('./../schemas/producto-eschema');
const productService = require ('./../services/productService');
const router= express.Router();
const services = new productService();
router.get('/',async (req,res)=>{
    const productos = await services.find();
    res.json(productos);
});
router.get('/filter',(req,res)=>{
    res.send('Yo soy un filter');
});

router.get('/:id',validadorHandler(getProductSchema,'params'),
async(req,res,next)=>{
    try {
        const {id}= req.params;
        const producto=await services.findByiD(id);
        res.json(producto);
    } catch (error) {
        next(error);
    }
});

router.post('/',validadorHandler(createProductSchema,'body'),
async(req,res)=>{
    const body = req.body;
    const nuevop =await services.create(body);
    res.status(201).json(nuevop);
});

router.patch('/:id',validadorHandler(getProductSchema,'params'),
validadorHandler(updateProductSchema,'body'),
async(req,res,next)=>{
    try {
    const{id }= req.params;
    const body = req.body;
    const producto = await services.update(id,body);
    res.json(producto);
    } catch (error) {
        next(error);    
    }
});

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const deleted= await services.delete(id);
    if(deleted){
        res.status(202).json({ mensaje: "producto eliminado",
            detalle: deleted
        });
    }else{res.status(404).json({ mensaje: "producto inexistente"});}
});
module.exports = router;