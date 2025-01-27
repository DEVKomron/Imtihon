const { errorHandler } = require('../helpers/error_handler');
const { Seller } = require('../models/index')
const Contract = require('../models/contract');

const createContract = async (req, res) => {
    try {
        const {
            contract_number,
            signing_date,
            start_date,
            end_date,
            total_amount,
            monthly_payment,
            payment_terms,
            contract_status,
            additional_terms,
            SellerId,
            CustomerId,
            OrderId
        } = req.body;

        const contract = await Contract.create({
            contract_number,
            signing_date,
            start_date,
            end_date,
            total_amount,
            monthly_payment,
            payment_terms,
            contract_status,
            additional_terms,
            SellerId,
            CustomerId,
            OrderId
        });

        res.status(201).send({
            message: 'Shartnoma muvaffaqiyatli yaratildi',
            contract
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll(
            {
                include:[Seller]
            }
        );
        res.send(contracts);
    } catch (error) {
        errorHandler(error, res);
    }
};

const getContractById = async (req, res) => {
    try {
        const contract = await Contract.findByPk(req.params.id);
        if (!contract) {
            return res.status(404).send({ message: 'Shartnoma topilmadi' });
        }
        res.send(contract);
    } catch (error) {
        errorHandler(error, res);
    }
};

const updateContract = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            contract_number,
            signing_date,
            start_date,
            end_date,
            total_amount,
            monthly_payment,
            payment_terms,
            contract_status,
            additional_terms,
            SellerId,
            CustomerId,
            OrderId
        } = req.body;

        const contract = await Contract.findByPk(id);
        if (!contract) {
            return res.status(404).send({ message: 'Shartnoma topilmadi' });
        }

        await contract.update({
            contract_number,
            signing_date,
            start_date,
            end_date,
            total_amount,
            monthly_payment,
            payment_terms,
            contract_status,
            additional_terms,
            SellerId,
            CustomerId,
            OrderId
        });

        res.send({
            message: 'Shartnoma muvaffaqiyatli yangilandi',
            contract
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteContract = async (req, res) => {
    try {
        const { id } = req.params;

        const contract = await Contract.findByPk(id);
        if (!contract) {
            return res.status(404).send({ message: 'Shartnoma topilmadi' });
        }

        await contract.destroy();
        res.send({ message: 'Shartnoma muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract
};
