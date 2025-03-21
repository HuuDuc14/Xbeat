import React from 'react';
import { Routes, Route } from 'react-router';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import DetailProduct from '../pages/DetailProduct';
import Order from '../pages/Oder';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoute from './AdminRoute';
import ManageProducts from '../pages/admin/manage/ManageProduct';
import ManageOrder from '../pages/admin/manage/ManageOrder';

const RouterRoutes = () => {

    // useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<DetailProduct />} />
                <Route path="/order" element={<Order/>}/>
                <Route path="*" element={<ErrorPage />} />

                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard/>} />
                    <Route path="/admin/product" element={<ManageProducts/>} />
                    <Route path="/admin/orders" element={<ManageOrder/>} />
                </Route>
            </Routes>
        </>
    );
};

export default RouterRoutes;