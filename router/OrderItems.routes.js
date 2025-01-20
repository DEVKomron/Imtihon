const { createOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } = require("../controller/orderItem.controller");
const validateOrderItemData = require('../validation/order.validation')

const OrderitemRouter = require("express").Router();

OrderitemRouter.post("/create",createOrderItem);
OrderitemRouter.get("/all",getAllOrderItems);
OrderitemRouter.get("/:id",getOrderItemById);
OrderitemRouter.put("/:id",updateOrderItem);
OrderitemRouter.delete("/:id",deleteOrderItem);

module.exports = OrderitemRouter;