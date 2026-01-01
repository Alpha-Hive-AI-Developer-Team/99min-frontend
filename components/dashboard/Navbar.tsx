"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, MessageCircle, Bell, User, Menu, X, MessageSquare } from 'lucide-react';
import TicketBadge from './TicketBadge';
import LanguageDropdown from './LanguageDropdown';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/dashboard/explore', label: 'Explore' },
  { href: '/dashboard/create', label: 'Create' },
  { href: '/dashboard/subscriptions', label: 'Subscriptions' },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between">
          
          {/* Left Section: Ticket Icon + Search (hidden on mobile, shown on md+) */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <TicketBadge />
            
            {/* Search Bar - Hidden on mobile, shown on md+ */}
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textGray" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 bg-inputBg rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-textBlack placeholder:text-textGray"
              />
            </div>
          </div>

          {/* Middle Section: Navigation Links - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex items-center gap-8 mx-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors relative pb-1
                    ${isActive 
                      ? 'text-textBlack font-bold' 
                      : 'text-textGray hover:text-textBlack font-medium'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Icons + Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon Button - Only on mobile */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-textGray" />
            </button>

            {/* Language Dropdown - Hidden on mobile */}
            <div className="hidden md:block">
              <LanguageDropdown />
            </div>

            {/* Action Icons - Hide some on mobile */}
            <button className="hidden sm:block p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-textGray" />
            </button>
            
            <Link href="/dashboard/notifications">
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative">
                <Bell className={`w-5 h-5 ${pathname === '/dashboard/notifications' ? 'text-orange' : 'text-textGray'}`} />
                {/* Notification badge can be added here */}
              </button>
            </Link>
            
            <Link href="/dashboard/settings">
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <User className={`w-5 ${pathname === '/dashboard/settings' ? 'text-orange' : 'text-textGray'} h-5 `} />
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors ml-2"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-textBlack" />
              ) : (
                <Menu className="w-5 h-5 text-textBlack" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Shown when search icon is clicked */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textGray" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 bg-inputBg rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white transition-all text-textBlack placeholder:text-textGray"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu - Navigation Links */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 pb-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-bold text-base transition-colors py-2 px-2 rounded-lg
                      ${isActive 
                        ? 'text-orange bg-iconBg' 
                        : 'text-textGray hover:text-textBlack hover:bg-gray-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Language Dropdown in Mobile Menu */}
              <div className="md:hidden pt-2 border-t border-gray-200">
                <LanguageDropdown />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

