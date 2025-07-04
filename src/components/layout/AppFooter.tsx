
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    Home, 
    FileText, 
    Plus, 
    BookOpen,
    Sparkles,
    ArrowUp,
    ArrowDown,
    Send,
    Link as LinkIcon,
    ArrowLeftRight,
    RefreshCw,
    BellRing,
    Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ActionPill = ({ href, icon: Icon, title, disabled = false, iconColor }: { href?: string, icon: React.ElementType, title: string, disabled?: boolean, iconColor?: string }) => {
    const content = (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-neutral-800 aspect-square transition-colors",
            !disabled && "hover:bg-neutral-700",
            disabled && "opacity-60 cursor-not-allowed"
        )}>
            <Icon className={cn("w-8 h-8 mb-1", iconColor)} />
            <p className="font-semibold text-xs leading-tight">{title}</p>
        </div>
    );
    
    if (disabled || !href) {
        return <div className="cursor-not-allowed">{content}</div>;
    }

    return <Link href={href}>{content}</Link>;
};


const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/add', icon: Plus, label: 'Actions' },
  { href: '/chat', icon: Sparkles, label: 'Gabi' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
];

export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full sm:max-w-sm mx-auto p-4 z-20">
      <div className="bg-black rounded-full h-16 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const isActionMenu = item.label === 'Actions';
          const isActive = !isActionMenu && (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href || '')));
          
          if (isActionMenu) {
            return (
              <Popover key={item.label}>
                <PopoverTrigger asChild>
                   <button
                    aria-label={item.label}
                    className={cn(
                        'flex items-center justify-center w-12 h-12 rounded-full transition-colors text-primary-foreground/70 hover:bg-white/20'
                    )}
                    >
                    {item.icon && <item.icon className="w-6 h-6" />}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mb-2 rounded-3xl bg-black border border-neutral-700 text-primary-foreground">
                  <div className="p-2 space-y-4">
                     <p className="text-sm font-semibold text-primary-foreground/80 px-1 text-center">Quick Actions</p>
                     <div className="grid grid-cols-4 gap-2">
                        <ActionPill href="/add/income" icon={ArrowUp} title="Add Income" iconColor="text-emerald-500" />
                        <ActionPill href="/add/expense" icon={ArrowDown} title="Add Expense" iconColor="text-red-500" />
                        <ActionPill href="/invoice/new" icon={Send} title="Send Invoice" iconColor="text-primary"/>
                        <ActionPill href="/payment-link/new" icon={LinkIcon} title="Payment Link" iconColor="text-primary" />
                        <ActionPill href="/transfer/new" icon={ArrowLeftRight} title="Record Transfer" iconColor="text-cyan-500" />
                        <ActionPill href="/recurring/new" icon={RefreshCw} title="Recurring" iconColor="text-purple-500" />
                        <ActionPill href="/reminder/new" icon={BellRing} title="Set Reminder" iconColor="text-orange-500" />
                        <ActionPill href="/inventory/new" icon={Package} title="Add Inventory" iconColor="text-blue-500" />
                     </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href || '#'}
              aria-label={item.label}
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-full transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-primary-foreground/70 hover:bg-white/20'
              )}
            >
                {item.icon && <item.icon className="w-6 h-6" />}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
