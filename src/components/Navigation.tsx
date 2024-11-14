import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Home, Search, MessageSquare, User, Clock, Bell, Target } from 'lucide-react';
import { authService } from '../services/authService';

const Navigation: React.FC = () => {
  const location = useLocation();
  const unreadNotifications = useSelector((state: RootState) => state.notifications.unreadCount);
  const isAuthenticated = authService.isAuthenticated();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-white">Your<span className="text-red-600">Choice</span></span>
          </Link>
          <div className="flex space-x-4">
            <NavLink to="/dashboard" icon={<Home />} text="Dashboard" active={isActive('/dashboard')} />
            <NavLink to="/search" icon={<Search />} text="Explore" active={isActive('/search')} />
            {isAuthenticated ? (
              <>
                <NavLink to="/messages" icon={<MessageSquare />} text="Messages" active={isActive('/messages')} />
                <NavLink to="/profile" icon={<User />} text="Profile" active={isActive('/profile')} />
                <NavLink to="/transactions" icon={<Clock />} text="History" active={isActive('/transactions')} />
                <NavLink 
                  to="/notifications" 
                  icon={<Bell />} 
                  text="Notifications" 
                  active={isActive('/notifications')} 
                  badge={unreadNotifications} 
                />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-red-600 transition duration-300"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string; active: boolean; badge?: number }> = ({ to, icon, text, active, badge }) => (
  <Link to={to} className={`flex items-center ${active ? 'text-red-600' : 'text-gray-300 hover:text-red-600'} transition duration-300`}>
    <div className="relative">
      {icon}
      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
    <span className="ml-1">{text}</span>
  </Link>
);

export default Navigation;