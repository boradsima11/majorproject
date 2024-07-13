//this is server side schema validation npm package : JOI
const Joi = require('joi'); //require from the npm

//listingSchema : this variable name
module.exports.listingSchema = Joi.object({        // Joi.object: Again, this is a method from Joi that creates a schema object.
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().min(0).required(),
        image:Joi.string().allow("",null),
    }).required(),
});

//reviewschema
module.exports.reviewSchema= Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
});