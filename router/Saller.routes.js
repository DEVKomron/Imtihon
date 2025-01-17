const { updateSeller, getAllSellers, getSellerById, deleteSeller, registerSeller, loginSeller } = require("../controller/saller.controller");

const SallerRouter = require("express").Router();


SallerRouter.put("/:id",updateSeller);
SallerRouter.post("/create",registerSeller);
SallerRouter.post("/login",loginSeller);
SallerRouter.get("/all",getAllSellers);
SallerRouter.get("/:id",getSellerById);
SallerRouter.delete("/:id",deleteSeller);

module.exports = SallerRouter;