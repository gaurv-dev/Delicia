import { api } from './api';

export const createCustomCake = async (payload) => {
    const response = await api.post('/custom-cakes', payload);
    return response.data;
};