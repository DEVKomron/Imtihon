const { errorHandler } = require('../helpers/error_handler');
const ProductDetail = require('../models/productdetail');

// Create a new ProductDetail
const createProductDetail = async (req, res) => {
    try {
        const product = await ProductDetail.create(req.body);
        res.status(201).json({
            message: 'Mahsulot muvaffaqiyatli yaratildi',
            product
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Get all ProductDetails
const getAllProductDetails = async (req, res) => {
    try {
        const products = await ProductDetail.findAll();
        res.json(products);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Get a ProductDetail by ID
const getProductDetailById = async (req, res) => {
    try {
        const product = await ProductDetail.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }
        res.json(product);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Update a ProductDetail by ID
const updateProductDetail = async (req, res) => {
    try {
        const product = await ProductDetail.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        await product.update(req.body);
        res.json({
            message: 'Mahsulot muvaffaqiyatli yangilandi',
            product
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Delete a ProductDetail by ID
const deleteProductDetail = async (req, res) => {
    try {
        const product = await ProductDetail.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        await product.destroy();
        res.json({ message: 'Mahsulot muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    createProductDetail,
    getAllProductDetails,
    getProductDetailById,
    updateProductDetail,
    deleteProductDetail
};
