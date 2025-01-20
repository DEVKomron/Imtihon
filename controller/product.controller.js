const { errorHandler } = require('../helpers/error_handler');
const Product = require('../models/product');
const ProductDetail = require('../models/productdetail'); 

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send({
            message: 'Mahsulot muvaffaqiyatli yaratildi',
            product
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [ProductDetail]
        });
        res.send(products);
    } catch (error) {
        errorHandler(error, res);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [ProductDetail] 
        });
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }
        res.send(product);
    } catch (error) {
        errorHandler(error, res);
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }
        const updatedProduct = await product.update(req.body);
        res.send({
            message: 'Mahsulot muvaffaqiyatli yangilandi',
            updatedProduct
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }
        await product.destroy();
        res.send({
            message: 'Mahsulot muvaffaqiyatli o\'chirilgan'
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
