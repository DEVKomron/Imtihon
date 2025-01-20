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
            return res.status(400).send({ message: 'Email allaqachon ro\'yxatdan o\'tgan' });
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

        res.status(201).send({
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
            return res.status(404).send({ message: 'Email yoki parol xato' });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Email yoki parol xato' });
        }

        const token = jwt.sign({ id: customer.id }, config.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: customer.id }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.send({
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
            return res.status(400).send({ message: 'Token talab qilinadi' });
        }

        jwt.verify(token, config.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Noto\'g\'ri yoki muddati o\'tgan token' });
            }

            const newToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, { expiresIn: '1h' });
            res.send({ token: newToken });
        });
    } catch (error) {
        errorHandler(error, res);
    }
};
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.send(customers);
    } catch (error) {
        errorHandler(error, res)     
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Mijoz topilmadi' });
        }
        res.send(customer);
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
