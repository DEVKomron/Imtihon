const { createProductDetail, getProductDetailById, getAllProductDetails, updateProductDetail } = require("../controller/productdetail.controller");

const ProductRouter = require("express").Router();

ProductRouter.post("/create",createProductDetail);
ProductRouter.post("/update",updateProductDetail);
ProductRouter.get("/all",getAllProductDetails);
ProductRouter.get("/:id",getProductDetailById);
ProductRouter.delete("/:id",updateProductDetail);


module.exports = ProductRouter;