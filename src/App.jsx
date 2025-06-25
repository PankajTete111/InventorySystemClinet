import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ProductList from './features/products/ProductList';
import CategoryList from './features/categories/CategoryList';
import SupplierList from './features/suppliers/SupplierList';
import InventoryPage from './features/inventory/InventoryPage';
import OrderList from './features/orders/OrderList';
import ReportsPage from './features/reports/ReportsPage';
import SettingsPage from './features/settings/SettingsPage';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/suppliers" element={<SupplierList />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default App; 