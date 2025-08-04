import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Workers from './pages/Workers';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Team from './pages/Team';
import Communications from './pages/Communications';
import Audit from './pages/Audit';
import Content from './pages/Content';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const hasRegistered = localStorage.getItem('hasRegistered') === 'true';


  return (
    <BrowserRouter>
      <Routes>
        {/* Entry route decides where to go */}
       <Route
  path="/"
  element={
    !hasRegistered ? (
      <Navigate to="/register" />
    ) : !isLoggedIn ? (
      <Navigate to="/login" />
    ) : (
      <Navigate to="/dashboard" />
    )
  }
/>


        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="workers" element={<Workers />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="team" element={<Team />} />
          <Route path="communications" element={<Communications />} />
          <Route path="audit" element={<Audit />} />
          <Route path="content" element={<Content />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
