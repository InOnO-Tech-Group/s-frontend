import { Routes, Route } from 'react-router-dom';

import TestPage from './pages/test';
import Homepage from './pages/Homepage';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOTP from './pages/auth/VerifyOTP';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardNotFound from './pages/dashboard/DashboardNotFound';
import DashboardAnnouncements from './pages/dashboard/DashboardAnnouncements';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="news" element={<div>News & Updates</div>} />
        <Route path="announcements" element={<DashboardAnnouncements/>} />
        <Route path="messages" element={<div>Messages</div>} />
        <Route path="profile" element={<div>Profile Page</div>} />
        <Route path="*" element={<DashboardNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
