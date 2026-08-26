import api from './api';

export const registerUser = async ({ name, email, password, phone }) => {
    const response = await api.post('/auth/register', { name, email, password, phone });
    return response.data; // { token }
};

export const loginUser = async ({ email, password }) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { token }
};