const { errorHandler } = require('../helpers/error_handler');
const Seller = require('../models/seller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');


const registerSeller = async (req, res) => {
  try {
      const { full_name, phone_number, passport_data, hire_date, salary, position, password, role } = req.body;

  
      const existingSeller = await Seller.findOne({ where: { passport_data } });
      if (existingSeller) {
          return res.status(400).json({ message: 'Bu passport  bilan sotuvchi allaqachon royxatdan otgan' });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const seller = await Seller.create({
          full_name,
          phone_number,
          passport_data,
          hire_date,
          salary,
          position,
          password: hashedPassword,
          role
      });

      res.status(201).json({
          message: 'Sotuvchi muvaffaqiyatli ro‘yxatdan o‘tdi',
          seller
      });
  } catch (error) {
      console.error('Xatolik:', error);
      res.status(500).json({ message: 'Ichki server xatosi' });
  }
};

const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        const seller = await Seller.findOne({ where: { email } });
        if (!seller) {
            return res.status(404).json({ message: 'Email yoki parol xato' });
        }

        const isPasswordValid = await bcrypt.compare(password, seller.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email yoki parol xato' });
        }

        const token = jwt.sign({ id: seller.id, role: 'admin' }, config.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: seller.id, role: 'admin' }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login muvaffaqiyatli bajarildi',
            token,
            refreshToken
        });
    } catch (error) {
        errorHandler(error, res);
    }
};



const refreshToken = (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token talab qilinadi' });
        }

        jwt.verify(token, config.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Noto\'g\'ri yoki muddati o\'tgan token' });
            }

            const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, config.JWT_SECRET, { expiresIn: '1h' });
            res.send({ token: newToken });
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

const getSellerById = async (req, res, next) => {
  try {
    const seller = await Seller.findByPk(req.params.id);
    if (!seller) return res.status(404).send({ message: 'Seller not found' });
    res.status(200).send(seller);
  } catch (error) {
    errorHandler(error, res)

;
  }
};
const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.findAll();
    res.status(200).send(sellers);
  } catch (error) {
    errorHandler(error, res)

    ;
  }
};

const updateSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findByPk(req.params.id);
    if (!seller) return res.status(404).send({ message: 'Seller not found' });

    await seller.update(req.body);
    
    res.status(200).send(seller);

  } catch (error) {
    errorHandler(error, res)

   
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findByPk(req.params.id);

    
  if (!seller) return res.status(404).send({ message: 'Seller not found' });
  
  await seller.destroy();
  
  res.status(204).send();
  
} catch (error) {
    errorHandler(error, res)

    
  }
};

module.exports = {
    getAllSellers,
    getSellerById,
    updateSeller,
    deleteSeller,
    registerSeller,
    loginSeller,
    refreshToken
};
