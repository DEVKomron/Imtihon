const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controller/product.controller");

const ProductRouter = require("express").Router();

ProductRouter.post("/create",createProduct);
ProductRouter.put("/update",updateProduct);
ProductRouter.get("/all",getAllProducts);
ProductRouter.get("/:id",getProductById);
ProductRouter.delete("/:id", deleteProduct)

module.exports = ProductRouter;