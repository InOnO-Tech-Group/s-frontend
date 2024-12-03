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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      addToast('error', 'Please login first!', 5000);
      navigate('/login');
      return;
    }
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem('token');
    addToast('success', 'Logged out successfully', 5000);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
