const { createOrder, getAllOrders, getOrderById } = require("../controller/order.controller");
const { OrderValidation } = require("../validation/order.validation");

const OrderRouter = require("express").Router();

OrderRouter.post("/create",OrderValidation,createOrder);
OrderRouter.get("/all", getAllOrders);
OrderRouter.get("/:id",getOrderById);

module.exports = OrderRouter;