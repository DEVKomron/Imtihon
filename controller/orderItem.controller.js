const { errorHandler } = require('../helpers/error_handler');
const  OrderItem  = require('../models/orderItem');

const createOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.create(req.body);
        res.status(201).json({
            message: 'Buyurtma elementi muvaffaqiyatli yaratildi',
            orderItem
        });
    } catch (error) {
        errorHandler(error, res)

        
    }
};

const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.json(orderItems);
    } catch (error) {
        errorHandler(error, res)

        
    }
};

const getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Buyurtma elementi topilmadi' });
        }
        res.json(orderItem);
    } catch (error) {
        errorHandler(error, res)

    }
};


module.exports ={
    createOrderItem,
    getAllOrderItems,
    getOrderItemById
}