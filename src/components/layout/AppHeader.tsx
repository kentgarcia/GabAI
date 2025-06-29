
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, User, Settings, Languages } from 'lucide-react';

type AppHeaderProps = {
    userName: string;
};

export function AppHeader({ userName }: AppHeaderProps) {
    return (
        <header className="flex items-center justify-between">
            <Link href="/settings/profile" className="flex items-center gap-3">
                <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
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
                <Button variant="ghost" size="icon">
                    <Languages className="h-6 w-6" />
                </Button>
                 <Button asChild variant="ghost" size="icon">
                    <Link href="/settings/notifications">
                        <Bell className="h-6 w-6" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                    <Link href="/settings">
                        <Settings className="h-6 w-6" />
                    </Link>
                </Button>
            </div>
        </header>
    );
}
