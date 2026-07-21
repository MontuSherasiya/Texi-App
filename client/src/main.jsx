import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import './styles/index.css'
import "./admin/styles/admin.css";

import Login from "./admin/pages/Login.jsx"
import AdminLayout from "./admin/components/AdminLayout.jsx"
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx"
import Dashboard from "./admin/pages/Dashboard.jsx"
import Vehicles from "./admin/pages/Vehicles.jsx"
import Bookings from "./admin/pages/Bookings.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<App />} />

        {/* Admin site */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);