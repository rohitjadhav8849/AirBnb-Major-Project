const Joi = require("joi");

const MainValidationSchema = Joi.object({
    data: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0), // Ensure number, not string
        country: Joi.string().required(),
        image: Joi.object({
           url: Joi.string().uri().required(), // Validate as a valid URL
           filename:Joi.string().required()
        })
    })
.required()});


const reviewValidation = Joi.object({
    review: Joi.object({
       content:Joi.string().required(),
       rating:Joi.number().required().min(1).max(5), 
    }).required()
});

module.exports = { MainValidationSchema,reviewValidation };
