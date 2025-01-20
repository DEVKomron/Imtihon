const { errorHandler } = require('../helpers/error_handler');
const ProductDetail = require('../models/productdetail');
const Product = require('../models/product'); // Product modelini import qilish

// Create a new ProductDetail
const createProductDetail = async (req, res) => {
    try {
        const { product_id, full_description, specifications, manufacturer, warranty_terms, dimensions, material, color, category } = req.body;

        // Product mavjudligini tekshirish
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        // ProductDetail yaratish
        const productDetail = await ProductDetail.create({
            full_description,
            specifications,
            manufacturer,
            warranty_terms,
            dimensions,
            material,
            color,
            category,
            product_id  // to'g'ri bog'lanish
        });

        res.status(201).json({
            message: 'Mahsulot muvaffaqiyatli yaratildi',
            productDetail
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Get all ProductDetails
const getAllProductDetails = async (req, res) => {
    try {
        const productDetails = await ProductDetail.findAll({
            include: Product // Product bilan bog'lanish
        });
        res.json(productDetails);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Get a ProductDetail by ID
const getProductDetailById = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findByPk(req.params.id, {
            include: Product // Product bilan bog'lanish
        });

        if (!productDetail) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json(productDetail);
    } catch (error) {
        errorHandler(error, res);
    }
};

// Update a ProductDetail by ID
const updateProductDetail = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findByPk(req.params.id);
        if (!productDetail) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        await productDetail.update(req.body);
        res.json({
            message: 'Mahsulot muvaffaqiyatli yangilandi',
            productDetail
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Delete a ProductDetail by ID
const deleteProductDetail = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findByPk(req.params.id);
        if (!productDetail) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        await productDetail.destroy();
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
