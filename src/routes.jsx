import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from './pages/client/Homepage';
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
import Messages from './pages/dashboard/Messages';
import About from './pages/client/About';
import ClientsLayout from './pages/client/ClientsLayout';

const validateToken = () => {
  const token = localStorage.getItem('token');
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  const sessionDuration = 5 * 60 * 60 * 1000; // 5 hours

  if (!token || !tokenTimestamp) {
    return { isValid: false, reason: 'Please login first!' };
  }

  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);

  if (elapsedTime > sessionDuration) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    return { isValid: false, reason: 'Session expired. Please login again.' };
  }

  return { isValid: true };
};

const ProtectedRoute = ({ children }) => {
  const { addToast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const { isValid, reason } = validateToken();

      if (!isValid) {
        addToast('error', reason, 5000);
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
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
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

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
        addToast('error', 'Session expired. Please login again.', 5000);
      } else {
        throw new Error(response.message || 'Error fetching profile');
      }
    } catch (error) {
      addToast('error', error.message || 'Unknown error occurred', 3000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProfile();
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<HomeNotFound />} />

      <Route path="/" element={<ClientsLayout />}>
      <Route index element={<Homepage />} />
      <Route path="about" element={<About />} />
      </Route>
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
        <Route path="messages" element={<Messages />} />
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
