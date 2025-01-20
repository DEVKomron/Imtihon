const nodemailer = require('nodemailer');
const { Order, Payment, Contract, Customer, Product, Seller} = require('../models/index');
const { errorHandler } = require('../helpers/error_handler');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'komronmamataliyev@gmail.com',
        pass: 'ihpgzeolsclckvln'
    }
});

const createOrder = async (req, res) => {
    try {
        const { customer_id, seller_id, total_amount, installment_period, product_id } = req.body;

        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return errorHandler({ message: 'Mijoz topilmadi' }, res);
        }

        // Sotuvchi mavjudligini tekshirish
        const seller = await Seller.findByPk(seller_id);
        if (!seller) {
            return errorHandler({ message: 'Sotuvchi topilmadi' }, res);
        }

        // Mahsulot mavjudligini tekshirish
        const product = await Product.findByPk(product_id);
        if (!product) {
            return errorHandler({ message: 'Mahsulot topilmadi' }, res);
        }

        // Buyurtma yaratish
        const order = await Order.create({
            customer_id,
            seller_id,
            product_id,
            total_amount,
            installment_period,
            status: 'pending', 
            initial_payment: total_amount * 0.20,
            order_date: new Date()  // Hozirgi sana
        });

        // Shartnoma yaratish
        const contract = await Contract.create({
            order_id: order.id,
            contract_number: `CON-${order.id}`,
            total_amount,
            monthly_payment: (total_amount - (total_amount * 0.20)) / installment_period,
            payment_terms: `${installment_period} oy`,
            contract_status: 'active',
            seller_id,
            signing_date: new Date(),
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + installment_period)),
        });

        // To'lovni qayd etish
        await Payment.create({
            contract_id: contract.id,
            payment_date: new Date(),
            amount_paid: total_amount * 0.20,
            payment_method: 'cash',
        });

        // Mijozga email yuborish
        const mailOptions = {
            from: 'komronmamataliyev@gmail.com',
            to: customer.email,
            subject: `Shartnoma: ${contract.contract_number}`,
            html: `
                <h2>Shartnoma Tafsilotlari</h2>
                <p><strong>Mahsulot narxi:</strong> ${total_amount} so'm</p>
                <p><strong>Boshlang'ich to'lov:</strong> ${total_amount * 0.20} so'm</p>
                <p><strong>Oylik to'lov:</strong> ${((total_amount - (total_amount * 0.20)) / installment_period)} so'm (har oy)</p>
                <p><strong>To'lov muddati:</strong> ${installment_period} oy</p>
                <p><strong>Shartnoma raqami:</strong> ${contract.contract_number}</p>
                <p><strong>Shartnoma holati:</strong> Active</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send({
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

        res.send(orders);
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

        res.send(order);
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
