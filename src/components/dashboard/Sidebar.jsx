import { NavLink } from 'react-router-dom';
import { TbDashboard } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';

const Sidebar = ({ isCollapsed }) => {
  return (
    <nav
      className={`bg-dashboard-sidebar p-6 rounded-lg w-72 flex flex-col justify-between min-h-[500px] max-h-screen overflow-y-auto transition-all ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      aria-label="Sidebar Navigation"
    >
      <div className="text-center mb-8">
        <RxAvatar
          className={`${
            isCollapsed ? 'text-2xl' : 'text-6xl'
          }  mx-auto mb-2 text-gray-600`}
        />
        <h3
          className={`text-lg font-semibold text-white ${
            isCollapsed ? 'hidden' : ''
          }`}
        >
          John Doe
        </h3>{' '}
        <p className={`text-sm text-grey ${isCollapsed ? 'hidden' : ''}`}>
          System Admin
        </p>{' '}
      </div>

      <ul className="space-y-4">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <TbDashboard className="text-xl" />
            {!isCollapsed && <span className="text-base">Dashboard</span>}{' '}
            {/* Conditionally render text */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="news"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <TbDashboard className="text-xl" />
            {!isCollapsed && <span className="text-base">News & Updates</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="announcements"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <TbDashboard className="text-xl" />
            {!isCollapsed && <span className="text-base">Announcements</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <TbDashboard className="text-xl" />
            {!isCollapsed && <span className="text-base">Messages</span>}
          </NavLink>
        </li>
      </ul>

      <div className="mt-12">
        <ul>
          <li className="mb-2">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                  : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
              }
            >
              <FiSettings className="text-xl" />
              {!isCollapsed && (
                <span className="text-base">Profile & Settings</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                  : 'flex items-center gap-3 text-red hover:text-red-600 transition-colors'
              }
            >
              <FaSignOutAlt className="text-xl" />
              {!isCollapsed && <span className="text-base">Log Out</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
