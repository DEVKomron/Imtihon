const MainRouter =require("express").Router()

// const Contractrouter = require("./Contract.routes")
const Customerouter = require("./Customer.routes");
// const OrderRouter = require("./Order.routes");
const OrderitemRouter = require("./OrderItems.routes");
const PaymentRouter = require("./Payments.routes");
const ProductRouter = require("./Product.routes");
const SallerRouter = require("./Saller.routes");
const productdetail =require("./Productdetail.routes")


// MainRouter.use("/contract", Contractrouter);
MainRouter.use("/customer", Customerouter);
// MainRouter.use("/order", OrderRouter);
MainRouter.use("/orderitem", OrderitemRouter);
MainRouter.use("/payment", PaymentRouter);
MainRouter.use("/product", ProductRouter);
MainRouter.use("/productdetail", productdetail);
MainRouter.use("/saller ", SallerRouter);

module.exports = MainRouter




