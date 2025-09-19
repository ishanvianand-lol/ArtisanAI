// components/common/RoleBasedHeader.js
"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RoleBasedHeader() {
  const { user, role, handleLogout } = useAuth();
  const pathname = usePathname();

  if (!user || !role) return null;

  const isClient = role === 'client';
  const isSeller = role === 'seller';

  // Client Navigation Items
  const clientNavItems = [
    { href: '/web/client', label: 'Dashboard', icon: '🏠' },
    { href: '/web/client/browse', label: 'Browse Artisans', icon: '🔍' },
    { href: '/web/client/customize', label: 'Customize', icon: '🎨' },
    { href: '/web/client/orders', label: 'My Orders', icon: '📦' },
    { href: '/web/client/favorites', label: 'Favorites', icon: '❤️' },
  ];

  // Seller Navigation Items
  const sellerNavItems = [
    { href: '/web/seller', label: 'Dashboard', icon: '🏠' },
    { href: '/web/seller/products', label: 'Products', icon: '🛍️' },
    { href: '/web/seller/orders', label: 'Orders', icon: '📋' },
    { href: '/web/seller/portfolio', label: 'Portfolio', icon: '🖼️' },
    { href: '/web/seller/analytics', label: 'Analytics', icon: '📊' },
  ];

  const navItems = isClient ? clientNavItems : sellerNavItems;
  const headerColor = isClient ? 'bg-blue-600' : 'bg-purple-600';

  return (
    <header className={`${headerColor} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Role */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              Artisan Marketplace
            </Link>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isClient ? 'bg-blue-500' : 'bg-purple-500'
            }`}>
              {isClient ? '🛍️ Client' : '🎨 Seller'}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">
                {user.displayName || user.email}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/20 pt-4 pb-2">
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}