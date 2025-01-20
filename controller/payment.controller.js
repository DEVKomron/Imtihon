const { errorHandler } = require('../helpers/error_handler');
const Payment = require('../models/payment');

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({ include: ['Contract'] });
    res.status(200).send(payments);
  } catch (error) {
    errorHandler(error, res)

  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: ['Contract'] });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).send(payment);
  } catch (error) {
    errorHandler(error, res)


  }
};

const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).send(payment);
  } catch (error) {
    errorHandler(error, res)

  }
};

const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    await payment.update(req.body);
    res.status(200).send(payment);
  } catch (error) {
    errorHandler(error, res)


  }
};

const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).send({ message: 'Payment not found' });
    await payment.destroy();
    res.status(204).send(payment);
  } catch (error) {
    errorHandler(error, res)


  }
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}