const { errorHandler } = require('../helpers/error_handler');
const Customer = require('../models/customers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const registerCustomer = async (req, res) => {
    try {
        const { full_name, phone_number, address, passport_data, email, password } = req.body;

        // Email mavjudligini tekshirish
        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email allaqachon ro\'yxatdan o\'tgan' });
        }

        // Parolni xesh qilish
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mijoz yaratish
        const customer = await Customer.create({
            full_name,
            phone_number,
            address,
            passport_data,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Mijoz muvaffaqiyatli ro\'yxatdan o\'tdi',
            customer
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ where: { email } });
        if (!customer) {
            return res.status(404).json({ message: 'Email yoki parol xato' });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email yoki parol xato' });
        }

        const token = jwt.sign({ id: customer.id }, config.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: customer.id }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login muvaffaqiyatli bajarildi',
            token,
            refreshToken
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const refreshToken = (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token talab qilinadi' });
        }

        jwt.verify(token, config.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Noto\'g\'ri yoki muddati o\'tgan token' });
            }

            const newToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token: newToken });
        });
    } catch (error) {
        errorHandler(error, res);
    }
};
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        errorHandler(error, res)     
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Mijoz topilmadi' });
        }
        res.json(customer);
    } catch (error) {
        errorHandler(error, res)
    }
};
module.exports = {
    getAllCustomers,
    getCustomerById,
    registerCustomer,
    loginCustomer,
    refreshToken
};
