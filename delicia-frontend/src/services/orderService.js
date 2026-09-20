import api from './api';

export const placeOrder = async (userId, orderRequest) => {
    const res = await api.post('/orders', orderRequest, { params: { userId } });
    return res.data;
};

export const getMyOrders = async (userId) => {
    const res = await api.get('/orders', { params: { userId } });
    return res.data;
};