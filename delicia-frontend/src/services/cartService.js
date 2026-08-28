import api from './api';

export const getCart = async (userId) => {
    const res = await api.get('/cart', { params: { userId } });
    return res.data;
};

export const addItem = async (userId, productId, quantity = 1, customizationNote = '') => {
    const res = await api.post('/cart/items', null, {
        params: { userId, productId, quantity, customizationNote },
    });
    return res.data;
};

export const updateItemQty = async (userId, productId, quantity) => {
    const res = await api.put(`/cart/items/${productId}`, null, {
        params: { userId, quantity },
    });
    return res.data;
};

export const removeItem = async (userId, productId) => {
    const res = await api.delete(`/cart/items/${productId}`, { params: { userId } });
    return res.data;
};