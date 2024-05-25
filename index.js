const express = require('express');
const {faker} = require('@faker-js/faker');
const routerApi = require('./routes');
const app = express();
const port =3005;
const {logErrors,errorHandler,boomErrorHandler}= require('./middlewares/error-handler');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hola mi server en express')
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/mensaje',(req,res)=>{
    res.send('Hola desde la ruta de mensajes')
});




app.listen(port,()=>
console.log('servidor escuchando en  '+'http://localhost:3005'));

