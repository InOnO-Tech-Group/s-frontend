import { Routes, Route } from 'react-router-dom';

import TestPage from './pages/test';
import Homepage from './pages/Homepage';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPasswordSuccess from './components/auth/ResetPasswordSuccess';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password-sucess" element={<ResetPasswordSuccess />} />
      
    </Routes >
  );
};

export default AppRouter;
