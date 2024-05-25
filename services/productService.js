const {faker, th} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class productService {

    constructor(){
        this.productos = [];
        this.generate();
    }
    generate(){
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.productos.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                precio: parseInt( faker.commerce.price()),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }
     async create(data){
        const nuevop = {
            id: faker.string.uuid(),
            ...data
        }
        this.productos.push(nuevop);
        return nuevop;
    }

     async find(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(this.productos);
            },5000);
        })
    }
    async findByiD(id){
        const producto=this.productos.find(item=>item.id===id);
        if(!producto){
            throw boom.notFound('product not found');
        }
        if(producto.isBlock)
            {
                throw boom.conflict('product is block');
            }
        return producto;
    }
    async update(id,cambios){
        const index = this.productos.findIndex(item => item.id === id);
        if(index==-1){
            throw boom.notFound('Este producto no se encontro');
        }
        const productoc =this.productos[index];
        this.productos[index]={
            ...productoc,
            ...cambios
        }
        return this.productos[index];
    }
    async delete(id){
    const index = this.productos.findIndex(item => item.id === id);
    var eliminado = this.productos[index]; 
    this.productos.splice(index, 1);
    return eliminado;
    }
}
module.exports= productService;