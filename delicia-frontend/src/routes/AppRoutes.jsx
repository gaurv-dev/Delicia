import {
    BrowserRouter, Routes, Route
} from 'react-router-dom';
import {
    AuthProvider
} from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart/Cart';
import AdminProducts from '../pages/Admin/Adminproduct';

export default function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}