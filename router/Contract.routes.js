const { createContract, getAllContracts, getContractById } = require("../controller/contract.controller");

const Contractrouter = require("express").Router();

Contractrouter.post("/create", createContract);
Contractrouter.get("/all", getAllContracts);
Contractrouter.get("/:id",getContractById);

module.exports = Contractrouter;