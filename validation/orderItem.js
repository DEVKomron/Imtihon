const validateOrderItemData = (quantity, price, category) => {
    if (!quantity || quantity <= 0) {
        return { message: 'Quantity 0 dan katta bo‘lishi kerak' };
    }
    if (!price || price <= 0) {
        return { message: 'Price 0 dan katta bo‘lishi kerak' };
    }
    if (category && category.length > 50) {
        return { message: 'Category uzunligi 50 belgidan oshmasligi kerak' };
    }
    return null;
};