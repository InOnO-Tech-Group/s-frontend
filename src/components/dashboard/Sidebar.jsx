import { NavLink } from 'react-router-dom';
import { TbDashboard } from 'react-icons/tb';
import { FiSettings, FiMessageSquare, FiHome, FiFolder } from 'react-icons/fi';
import { FaSignOutAlt, FaBullhorn, FaHandHolding } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { IoNewspaperOutline, IoSettingsOutline } from 'react-icons/io5';
import { GrGallery } from 'react-icons/gr';

const Sidebar = ({ isCollapsed, onLogout, profile }) => {
  return (
    <nav
      className={`bg-dashboard-sidebar p-6 rounded-lg flex flex-col justify-between min-h-[500px] max-h-screen overflow-y-auto transition-all ${
        isCollapsed ? 'w-20' : 'w-62'
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
          {profile.firstname} {profile.lastname}
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
            {!isCollapsed && <span className="text-base">Dashboard</span>}
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
            <IoNewspaperOutline className="text-xl" />
            {!isCollapsed && <span className="text-base">Blogs & News</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="services"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <FiFolder className="text-xl" />
            {!isCollapsed && <span className="text-base">Services</span>}
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
            <FaBullhorn className="text-xl" />
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
            <FiMessageSquare className="text-xl" />
            {!isCollapsed && <span className="text-base">Messages</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="gallery"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-black text-white border-l-4 border-primary transition-colors p-3 rounded'
                : 'flex items-center gap-3 text-grey hover:text-blue-500 transition-colors'
            }
          >
            <GrGallery className="text-xl" />
            {!isCollapsed && <span className="text-base">Gallery</span>}
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
            <button
              onClick={onLogout}
              className={`flex w-full gap-3 px-4 pt-2 p-2  rounded-lg shadow-sm 
      text-red-600 hover:text-white hover:bg-red-600 transition-all 
      duration-300 focus:ring-2 focus:ring-red-400 focus:outline-none pl-1`}
            >
              <FaSignOutAlt className="text-xl" />
              {!isCollapsed && (
                <span className="text-base font-medium tracking-wide">
                  Log Out
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
