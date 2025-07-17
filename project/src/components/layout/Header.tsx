import React, { useState } from 'react';
import { Search, Menu, X, User, Bell, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import SearchBar from '../features/search/SearchBar';
import UserMenu from './UserMenu';
import MegaMenu from './MegaMenu';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navigation = [
    { name: 'Experiencias', href: '/experiences', hasSubmenu: true },
    { name: 'Equipos', href: '/equipment', hasSubmenu: true },
    { name: 'Instructores', href: '/instructors' },
    { name: 'Ubicaciones', href: '/locations' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">
                Aquaxperience
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
                {item.hasSubmenu && activeMenu === item.name && (
                  <MegaMenu category={item.name.toLowerCase()} />
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search button - Mobile */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>

                {/* Favorites */}
                <button
                  className="p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Favorites"
                >
                  <Heart className="h-6 w-6" />
                </button>

                {/* Bookings */}
                <button
                  className="p-2 text-gray-400 hover:text-gray-500"
                  aria-label="My bookings"
                >
                  <ShoppingBag className="h-6 w-6" />
                </button>

                {/* User Menu */}
                <UserMenu user={user} />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <a href="/login">Iniciar Sesión</a>
                </Button>
                <Button size="sm">
                  <a href="/register">Registrarse</a>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center p-4 border-b">
            <div className="flex-1">
              <SearchBar autoFocus />
            </div>
            <button
              className="ml-4 p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                {item.name}
              </a>
            ))}
          </div>
          {!user && (
            <div className="px-4 py-3 border-t border-gray-200 space-y-2">
              <Button variant="outline" className="w-full">
                <a href="/login">Iniciar Sesión</a>
              </Button>
              <Button className="w-full">
                <a href="/register">Registrarse</a>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;