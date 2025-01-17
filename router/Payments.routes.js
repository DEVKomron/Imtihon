const { createPayment, updatePayment, getAllPayments, getPaymentById, deletePayment } = require("../controller/payment.controller");

const PaymentRouter = require("express").Router();

PaymentRouter.post("/create",createPayment);
PaymentRouter.put("/:id",updatePayment);
PaymentRouter.get("/all",getAllPayments);
PaymentRouter.get("/:id",getPaymentById);
PaymentRouter.delete("/:id",deletePayment)

module.exports = PaymentRouter;