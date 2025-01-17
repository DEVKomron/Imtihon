const {
      getAllCustomers,
       getCustomerById,
        loginCustomer ,
        registerCustomer
    } = require("../controller/customer.controller");

const Customerouter = require("express").Router();

Customerouter.post("/create",registerCustomer);
Customerouter.post("/login",loginCustomer);
Customerouter.get("/all", getAllCustomers);
Customerouter.get("/:id",getCustomerById);


module.exports = Customerouter;