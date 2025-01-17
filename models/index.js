// Model bog'lanishlarini o'rnatish
const Admin = require('./admin');
const Contract = require('./contract');
const Customer = require('./customers');
const Image = require('./image');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Payment = require('./payment');
const Product = require('./product');
const ProductDetail = require('./productdetail');
const Seller = require('./seller');

// Order va Payment o'rtasidagi bog'lanish
Order.hasMany(Payment);   
Payment.belongsTo(Order);

// Customer va Order o'rtasidagi bog'lanish
Customer.hasMany(Order);
Order.belongsTo(Customer);

// Seller va Order o'rtasidagi bog'lanish
Seller.hasMany(Order, { foreignKey: 'seller_id', as: 'order' });  
Order.belongsTo(Seller, { foreignKey: 'seller_id', as: 'seller' });

// Seller va Contract o'rtasidagi bog'lanish
Seller.hasMany(Contract);
Contract.belongsTo(Seller);

// Customer va Contract o'rtasidagi bog'lanish
Customer.hasMany(Contract);
Contract.belongsTo(Customer);

// Order va Contract o'rtasidagi bog'lanish
Order.hasOne(Contract);
Contract.belongsTo(Order);

// Order va OrderItem o'rtasidagi bog'lanish
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product va ProductDetail o'rtasidagi bog'lanish
Product.hasOne(ProductDetail);
ProductDetail.belongsTo(Product);

// Product va Image o'rtasidagi bog'lanish
Product.hasMany(Image);
Image.belongsTo(Product);

// Product va OrderItem o'rtasidagi bog'lanish
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Contract va Payment o'rtasidagi bog'lanish
Contract.hasMany(Payment);
Payment.belongsTo(Contract);

module.exports = {
    Admin,
    Contract,
    Customer,
    Image,
    Order,
    OrderItem,
    Payment,
    Product,
    ProductDetail,
    Seller,
};
