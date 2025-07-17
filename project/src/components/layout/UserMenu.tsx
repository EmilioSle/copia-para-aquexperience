import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Calendar, Star, CreditCard } from 'lucide-react';
import { User as UserType } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface UserMenuProps {
  user: UserType;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: 'Mi Perfil', href: '/profile' },
    { icon: Calendar, label: 'Mis Reservas', href: '/bookings' },
    { icon: Star, label: 'Mis Reseñas', href: '/reviews' },
    { icon: CreditCard, label: 'Métodos de Pago', href: '/payment-methods' },
    { icon: Settings, label: 'Configuración', href: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.avatar ? (
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </span>
          </div>
        )}
        <span className="hidden sm:block text-sm font-medium text-gray-700">
          {user.firstName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
              {user.role === 'client' && 'Cliente'}
              {user.role === 'instructor' && 'Instructor'}
              {user.role === 'provider' && 'Proveedor'}
              {user.role === 'admin' && 'Administrador'}
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                {item.label}
              </a>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-3 text-gray-400" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;