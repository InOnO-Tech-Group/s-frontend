import { Routes, Route } from 'react-router-dom';

import TestPage from './pages/test';
import Homepage from './pages/Homepage';
import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRouter;
