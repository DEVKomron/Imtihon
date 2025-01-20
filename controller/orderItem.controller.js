const { errorHandler } = require('../helpers/error_handler');
const OrderItem = require('../models/orderItem');

// Yordamchi funksiya: Malumot tekshiruvlari


// Buyurtma elementini yaratish
const createOrderItem = async (req, res) => {
    try {
        const { quantity, price, category } = req.body;


        const orderItem = await OrderItem.create({ quantity, price, category });
        res.status(201).send({
            message: 'Buyurtma elementi muvaffaqiyatli yaratildi',
            orderItem
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Buyurtma elementlarini olish
const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).send(orderItems);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Buyurtma elementini ID bo‘yicha olish
const getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Buyurtma elementi topilmadi' });
        }
        res.status(200).send(orderItem);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Buyurtma elementini yangilash
const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, price, category } = req.body;

        if (validationError) {
            return res.status(400).json(validationError);
        }

        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Buyurtma elementi topilmadi' });
        }

        await orderItem.update({ quantity, price, category });
        res.status(200).send({
            message: 'Buyurtma elementi muvaffaqiyatli yangilandi',
            orderItem
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Buyurtma elementini o‘chirish
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;

        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Buyurtma elementi topilmadi' });
        }

        await orderItem.destroy();
        res.status(200).send({ message: 'Buyurtma elementi muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    createOrderItem,
    getAllOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
};
