import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';

const DashboardLayout = () => {
  const location = useLocation();
  const [title, setTitle] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  useEffect(() => {
    let newTitle = 'Dashboard';

    if (location.pathname === '/dashboard') {
      newTitle = 'Dashboard';
    } else if (location.pathname === '/dashboard/news') {
      newTitle = 'News & Updates';
    } else if (location.pathname === '/dashboard/announcements') {
      newTitle = 'Announcements';
    } else if (location.pathname === '/dashboard/messages') {
      newTitle = 'Messages';
    } else if (location.pathname === '/dashboard/profile') {
      newTitle = 'Profile Page';
    } else {
      newTitle = 'Page Not Found';
    }

    setTitle(newTitle);
    document.title = newTitle;
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); 
  };

  return (
    <div className="p-4 flex bg-gray-100">
      <Sidebar isCollapsed={isSidebarCollapsed} />
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