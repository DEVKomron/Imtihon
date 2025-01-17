const nodemailer = require('nodemailer');
const Joi = require('joi');
const { Order, Payment, Contract, Customer, Product} = require('../models/index');
const { errorHandler } = require('../helpers/error_handler');

const orderSchema = Joi.object({
    customer_id: Joi.number().integer().required(),
    seller_id: Joi.number().integer().required(),
    total_amount: Joi.number().positive().required(),
    installment_period: Joi.number().valid(3, 6, 12).required()
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'komronmamataliyev@gmail.com',
        pass: 'ihpgzeolsclckvln'
    }
});

const createOrder = async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return errorHandler(error, res);
        }
        


        const { customer_id, seller_id, total_amount, installment_period } = req.body;

        // Boshlang'ich to'lovni hisoblash (20%)
        const initial_payment = total_amount * 0.20;

        // Oylik to'lovni hisoblash (qolgan summadan)
        let monthly_payment;
        switch (installment_period) {
            case 3:
                monthly_payment = (total_amount - initial_payment) * 0.30 / 3; // 30% 3 oyga
                break;
            case 6:
                monthly_payment = (total_amount - initial_payment) * 0.40 / 6; // 40% 6 oyga
                break;
            case 12:
                monthly_payment = (total_amount - initial_payment) * 0.30 / 12; // 30% 12 oyga
                break;
            default:
                return errorHandler({ message: "Oylik to'lov muddati noto'g'ri" }, res);
        }

        const order = await Order.create({
            customer_id,
            seller_id,
            product_id: req.body.product_id, // req.body dan product_id ni olish
            total_amount,
            installment_period,
            status: 'pending', // Buyurtma holati
            initial_payment,
            order_date: new Date()
        });

        const orderPk = await Order.findByPk(orderId); // Ensure the order exists before proceeding
        if (!orderPk) {
            return errorHandler({ message: 'Order not found' }, res);
        }
        
        // Shartnoma yaratish
        const contract = await Contract.create({
            order_id: order.id, // order_id ni to'g'ri uzatish
            contract_number: `CON-${order.id}`,
            total_amount,
            monthly_payment,
            payment_terms: `${installment_period} oy`,
            contract_status: 'active',
            seller_id,
            signing_date: new Date(),
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + installment_period)), // To'lov muddati
        });

        // To'lovni qayd etish (boshlang'ich to'lov)
        await Payment.create({
            contract_id: contract.id,
            payment_date: new Date(),
            amount_paid: initial_payment,
            payment_method: 'cash',
        });

        // Mijoz ma'lumotlarini olish
        const customer = await Customer.findByPk(customer_id);

        if (!customer) {
            return errorHandler({ message: 'Mijoz topilmadi' }, res);
        }

        // Mahsulot ma'lumotlarini olish
        const product = await Product.findByPk(order.product_id);
        if (!product) {
            return errorHandler({ message: 'Mahsulot topilmadi' }, res);
        }

        // Email yuborish
        const mailOptions = {
            from: 'komronmamataliyev@gmail.com',
            to: customer.email, // Mijozning email manzili
            subject: `Shartnoma: ${contract.contract_number}`,
            html: `
                <h2>Shartnoma Tafsilotlari</h2>

                <p><strong>Mahsulot narxi:</strong> ${total_amount} so'm</p>
                <p><strong>Boshlang'ich to'lov:</strong> ${initial_payment} so'm</p>
                <p><strong>Oylik to'lov:</strong> ${monthly_payment} so'm (har oy)</p>
                <p><strong>To'lov muddati:</strong> ${installment_period} oy</p>
                <p><strong>Shartnoma raqami:</strong> ${contract.contract_number}</p>
                <p><strong>Shartnoma holati:</strong> Active</p>
                <p>Shartnoma imzolandi. Mahsulotni to'liq olish uchun o'z vaqtida to'lovlarni amalga oshiring.</p>
            `
        };

        // Email yuborish
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Buyurtma va shartnoma muvaffaqiyatli yaratildi',
            order,
            contract
        });
    } catch (error) {
        console.error(error);
        return errorHandler(error, res);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [Customer, Contract, Payment]
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        return errorHandler(error, res);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [Customer, Contract, Payment]
        });

        if (!order) {
            return errorHandler({ message: 'Buyurtma topilmadi' }, res);
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        return errorHandler(error, res);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
};
