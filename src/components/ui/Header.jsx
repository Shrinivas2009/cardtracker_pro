import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Add Card', path: '/add-credit-card', icon: 'CreditCard' },
    { label: 'Add Transaction', path: '/add-transaction', icon: 'Plus' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="CreditCard" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              CardTracker Pro
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="px-3"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* User Actions & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {}}
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-pulse-gentle"></span>
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
          >
            <Icon name="User" size={20} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;