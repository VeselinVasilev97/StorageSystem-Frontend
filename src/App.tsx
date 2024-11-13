// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./Pages/DashboardPage";
import SuppliersPage from "./Pages/SuppliersPage";
import ProtectedRoute from "./components/LoginRegister/ProtectedRoute";
import OrdersPage from "./Pages/OrdersPage";
import UsersPage from "./Pages/UsersPage";
import ClientsPage from "./Pages/ClientsPage";
import RegisterPage from "./Pages/RegisterPage";
import ToDo from "./Pages/ToDo";
import ProductsPage from "./Pages/ProductsPage";
import { UserRole } from './types/roles'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole={UserRole.User}> 
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredRole={UserRole.Admin}> 
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole={UserRole.User}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suppliers"
            element={
              <ProtectedRoute requiredRole={UserRole.Admin}>
                <SuppliersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute requiredRole={UserRole.User}>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              // <ProtectedRoute>
                <UsersPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute requiredRole={UserRole.User}>
                <ToDo />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
