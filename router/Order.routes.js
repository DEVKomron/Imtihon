const { createOrder, getAllOrders, getOrderById } = require("../controller/order.controller");

const OrderRouter = require("express").Router();

OrderRouter.post("/create",createOrder);
OrderRouter.get("/all", getAllOrders);
OrderRouter.get("/:id",getOrderById);

module.exports = OrderRouter;