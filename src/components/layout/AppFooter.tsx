
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
    Package,
    ArrowLeftRight,
    Repeat,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/add', icon: Plus, label: 'Actions' },
  { href: '/chat', icon: Sparkles, label: 'Gabi' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
];

const ActionItem = ({ href, icon: Icon, title, description, disabled = false, iconColor }: { href?: string, icon: React.ElementType, title: string, description: string, disabled?: boolean, iconColor?: string }) => {
    const content = (
        <div className={cn(
            "flex items-center p-4 rounded-2xl bg-muted/40",
            !disabled && "hover:bg-muted",
            disabled && "opacity-50 cursor-not-allowed"
        )}>
            <Icon className={cn("w-6 h-6 mr-4", iconColor)} />
            <div className="text-left">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
    
    if (disabled || !href) {
        return content;
    }

    return <Link href={href}>{content}</Link>;
};


export function AppFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full sm:max-w-sm mx-auto p-4 z-20">
      <div className="bg-black rounded-full h-16 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const isActive = item.label !== 'Actions' && (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href || '')));
          
          if (item.label === 'Actions') {
            return (
              <Sheet key={item.label}>
                <SheetTrigger asChild>
                   <button
                    aria-label={item.label}
                    className={cn(
                        'flex items-center justify-center w-12 h-12 rounded-full transition-colors text-primary-foreground/70 hover:bg-white/20'
                    )}
                    >
                    {item.icon && <item.icon className="w-6 h-6" />}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl bg-background/90 backdrop-blur-lg border-none p-6">
                  <SheetHeader className="text-center mb-4">
                    <SheetTitle>Quick Actions</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-3">
                    <p className="text-sm font-semibold text-muted-foreground px-1">Primary Actions</p>
                    <ActionItem href="/add/income" icon={ArrowUp} title="Add Income" description="Manually log a payment received." iconColor="text-emerald-500" />
                    <ActionItem href="/add/expense" icon={ArrowDown} title="Add Expense" description="Record a new business cost." iconColor="text-red-500" />
                    <ActionItem icon={Send} title="Send Invoice" description="Bill a client with a professional, trackable invoice." disabled iconColor="text-primary"/>
                    <ActionItem icon={LinkIcon} title="Create Payment Link" description="Accept payments via GCash, Maya, and more." disabled iconColor="text-primary" />
                    
                    <Separator className="my-2" />
                    
                    <p className="text-sm font-semibold text-muted-foreground px-1">Secondary Actions</p>
                    <ActionItem icon={Package} title="Add Inventory Entry" description="Track stock levels for your products." disabled iconColor="text-primary"/>
                    <ActionItem icon={ArrowLeftRight} title="Record Transfer" description="Log fund movements between your accounts." disabled iconColor="text-primary"/>
                    <ActionItem icon={Repeat} title="Add Recurring Expense" description="Automate tracking for monthly bills." disabled iconColor="text-primary"/>
                    <ActionItem icon={Bell} title="Schedule Reminder" description="Set alerts for tax deadlines or follow-ups." disabled iconColor="text-primary"/>
                  </div>
                </SheetContent>
              </Sheet>
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
