import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useToast } from '../../components/toasts/ToastManager';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const sessionDuration = 3660 * 60 * 1000;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!token || !tokenTimestamp) {
        addToast('error', 'Please login first!', 3000);
        window.location.href = '/login'; 
        return false;
      }

      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);

      if (elapsedTime > sessionDuration) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        addToast('error', 'Session expired. Please login again.', 5000);
        window.location.href = '/login';
        return false;
      }

      return true;
    };

    const authorize = async () => {
      const authorized = await checkAuthorization();
      if (authorized) {
        setIsLoading(false);
      }
    };

    authorize();
  }, [location, addToast]);

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    addToast('success', 'Logged out successfully', 5000);
    window.location.href='/login';
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 flex bg-gray-100">
      <Sidebar onLogout={onLogout} isCollapsed={isSidebarCollapsed} />
      <div className="flex-1 min-h-screen overflow-y-auto rounded-lg pl-3">
        <div className="flex justify-between items-center mb-4 pt-2">
          <button onClick={toggleSidebar} className="text-xl text-gray-600">
            <FaBars />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;