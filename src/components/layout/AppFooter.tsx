'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Gift, Home, Trophy, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/chat', icon: Bot, label: 'Chat', isCentral: true },
  { href: '#', icon: Gift, label: 'Rewards' },
  { href: '#', icon: Trophy, label: 'Leaderboard' },
];

export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
      <div className="bg-black rounded-full h-14 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const isActive = item.href !== '#' && pathname.startsWith(item.href);

          if (item.isCentral) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors",
                  isActive && "ring-2 ring-offset-2 ring-offset-black ring-primary"
                )}
              >
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </Link>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center transition-colors",
                isActive ? "text-primary hover:text-primary/90" : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
