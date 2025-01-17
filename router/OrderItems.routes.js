const { createOrderItem, getAllOrderItems, getOrderItemById } = require("../controller/orderItem.controller");

const OrderitemRouter = require("express").Router();

OrderitemRouter.post("/create",createOrderItem);
OrderitemRouter.get("/all",getAllOrderItems);
OrderitemRouter.get("/:id",getOrderItemById);

module.exports = OrderitemRouter;