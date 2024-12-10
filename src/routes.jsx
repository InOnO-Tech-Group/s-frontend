import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { useToast } from './components/toasts/ToastManager';
import NewsAndUpdates from './pages/dashboard/NewsAndUpdates';
import Services from './pages/dashboard/Services';
import HomeNotFound from './pages/dashboard/HomeNotFound';
import Profile from './pages/dashboard/Profile';
import { userViewProfile } from './redux/slices/userSlice';

const ProtectedRoute = ({ children }) => {
  const { addToast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const sessionDuration = 5 * 60 * 60 * 1000;

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!token || !tokenTimestamp) {
        addToast('error', 'Please login first!', 3000);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);

      if (elapsedTime > sessionDuration) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        addToast('error', 'Session expired. Please login again.', 5000);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuthorization();
  }, [addToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const [profile, setProfile] = useState({});
  const { addToast } = useToast();
  const fetchProfile = async () => {
    try {
      const response = await userViewProfile();
      if (response.status === 200) {
        setProfile({
          firstname: response.data.firstName || '',
          lastname: response.data.lastName || '',
          email: response.data.email || '',
        });
      } else if (response.status === 401) {
        localStorage.removeItem('token');
      } else {
        throw new Error(response.message || 'Error fetching profile');
      }
    } catch (error) {
      addToast('error', error.message || 'Unknonw error occured', 3000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<HomeNotFound />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout profile={profile} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="news" element={<NewsAndUpdates />} />
        <Route path="services" element={<Services />} />
        <Route path="announcements" element={<DashboardAnnouncements />} />
        <Route path="messages" element={<div>Messages</div>} />
        <Route
          path="profile"
          element={
            <Profile profile={profile} onSuccess={() => fetchProfile()} />
          }
        />
        <Route path="*" element={<DashboardNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
