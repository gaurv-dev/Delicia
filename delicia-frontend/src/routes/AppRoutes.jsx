import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import {
    AuthProvider
} from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Orders from '../pages/Orders/Orders';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import AdminProducts from '../pages/Admin/Adminproduct';
import { PrivateRoute, AdminRoute } from './PrivateRoutes';

export default function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:id" element={<ProductDetails />} />

                    <Route path="/cart" element={
                        <PrivateRoute><Cart /></PrivateRoute>
                    } />
                    <Route path="/checkout" element={
                        <PrivateRoute><Checkout /></PrivateRoute>
                    } />
                    <Route path="/orders" element={
                        <PrivateRoute><Orders /></PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute><Profile /></PrivateRoute>
                    } />

                    <Route path="/admin/products" element={
                        <AdminRoute><AdminProducts /></AdminRoute>
                    } />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}