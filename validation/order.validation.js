const Joi = require('joi');

exports.OrderValidation = (data) => {

    const orderSchema = Joi.object({
        customer_id: Joi.number().integer().required(),
        seller_id: Joi.number().integer().required(),
        total_amount: Joi.number().positive().required(),
        installment_period: Joi.number().valid(3, 6, 12).required(),
        product_id: Joi.number().integer().required() 
    });
    return orderSchema.validate(data, { abortEarly: false });

}
