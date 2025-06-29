'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, FileText, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/add', icon: Plus, label: 'Add' },
  { href: '/chat', icon: Bot, label: 'Gabi' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
      <div className="bg-black rounded-full h-16 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)));
          
          return (
            <Link
              key={item.label}
              href={item.href === '/settings' ? '#' : item.href}
              aria-label={item.label}
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-full transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-primary-foreground/70 hover:bg-white/20'
              )}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
