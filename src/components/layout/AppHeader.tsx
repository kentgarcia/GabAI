
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Bell,
  User,
  Settings,
  Languages,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type AppHeaderProps = {
    userName: string;
};

export function AppHeader({ userName }: AppHeaderProps) {
    const { toast } = useToast();
    const [language, setLanguage] = useState('en');
    const [hasUnread, setHasUnread] = useState(true);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        let langName = 'English';
        if (lang === 'tl') langName = 'Tagalog';
        if (lang === 'ceb') langName = 'Bisaya';
        
        toast({
            title: 'Language Switched!',
            description: `Language set to ${langName}.`,
        });
    };

    return (
        <header className="flex items-center justify-between">
            <Link href="/settings/profile" className="flex items-center gap-3">
                <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage src="https://avatar.iran.liara.run/public/25" alt="User" />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-muted-foreground text-sm">Welcome back,</p>
                    <h1 className="text-xl font-bold">{userName}</h1>
                </div>
            </Link>
            <div className="flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Languages className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md border">
                        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                            <DropdownMenuRadioItem value="en" className="flex items-center gap-2">
                                <span role="img" aria-label="USA flag">🇺🇸</span> English
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="tl" className="flex items-center gap-2">
                                <span role="img" aria-label="Philippines flag">🇵🇭</span> Tagalog
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="ceb" className="flex items-center gap-2">
                                <span role="img" aria-label="Philippines flag">🇵🇭</span> Bisaya
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                 <DropdownMenu onOpenChange={(open) => { if (open) setHasUnread(false)}}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <div className="relative">
                                <Bell className="h-6 w-6" />
                                {hasUnread && (
                                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                )}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72 bg-background/80 backdrop-blur-md border">
                         <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem className="flex items-start gap-3 p-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold leading-tight">Tax Deadline Approaching</p>
                                <p className="text-xs text-muted-foreground">Your quarterly income tax payment is due in 3 days.</p>
                            </div>
                         </DropdownMenuItem>
                         <DropdownMenuItem className="flex items-start gap-3 p-3">
                            <TrendingUp className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold leading-tight">Weekly Profit Summary</p>
                                <p className="text-xs text-muted-foreground">Your profit is up 15% this week compared to last week!</p>
                            </div>
                         </DropdownMenuItem>
                         <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                             <Link href="/settings/notifications" className="justify-center text-sm text-primary">
                                See all notifications
                            </Link>
                         </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Button asChild variant="ghost" size="icon">
                    <Link href="/settings">
                        <Settings className="h-6 w-6" />
                    </Link>
                </Button>
            </div>
        </header>
    );
}
