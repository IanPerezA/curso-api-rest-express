const boom = require('@hapi/boom');

function validadorHandler(schema,propierty){
    return (req,res,next)=>{
        const data=req[propierty]
        const {error}=schema.validate(data,{abortEarly: false});
        if (error){
            next(boom.badRequest(error));
        }
        next();
    }
}
module.exports = validadorHandler;