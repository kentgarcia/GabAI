'use client';

import Link from 'next/link';
import {
  Menu,
  User,
  Mic,
  MessageCircle,
  Image as ImageIcon,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';

const actionCards = [
  {
    title: 'Talk with Bot',
    icon: Mic,
    href: '#',
    className: 'col-span-1 row-span-2 bg-primary/10',
    iconClass: 'w-8 h-8',
  },
  {
    title: 'Chat with Bot',
    icon: MessageCircle,
    href: '/chat/session',
    className: 'col-span-1 row-span-1 bg-primary/20',
    iconClass: 'w-6 h-6',
  },
  {
    title: 'Search by Image',
    icon: ImageIcon,
    href: '#',
    className: 'col-span-1 row-span-1 bg-primary/5',
    iconClass: 'w-6 h-6',
  },
];

const historyItems = [
  {
    title: 'ChatGPT',
    subtitle: 'Best 2023 mobile app suggestion...',
    icon: Bot,
    time: '22:10',
    href: '#',
  },
  {
    title: 'Midjourney',
    subtitle: 'Looking for dark UI design ideas.',
    icon: ImageIcon,
    time: '11:23',
    href: '#',
  },
  {
    title: 'Google AI',
    subtitle: 'How to make a great pitch deck?',
    icon: BrainCircuit,
    time: '06:15',
    href: '#',
  },
];

export default function ChatHubPage() {
  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
        <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
            <header className="flex items-center justify-between">
                <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                </Button>
                <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Online
                </div>
                <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
                </Avatar>
            </header>

            <section>
                <h1 className="text-3xl font-bold tracking-tight">Hi, there! 👋</h1>
                <h2 className="text-3xl font-bold tracking-tight text-muted-foreground">
                How may I help you today?
                </h2>
            </section>

            <section>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-48">
                {actionCards.map((card) => (
                    <Link key={card.title} href={card.href} className={card.className}>
                    <Card
                        className={cn(
                        'h-full w-full bg-transparent border-none rounded-2xl relative group transition-transform hover:scale-105',
                        card.className
                        )}
                    >
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-background/50 rounded-full">
                            <card.icon className={cn('text-primary', card.iconClass)} />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-primary/70 transition-transform group-hover:rotate-45" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary">{card.title}</h3>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
                </div>
            </section>
            
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">History</h2>
                    <Link href="#" className="text-sm text-primary">See all</Link>
                </div>
                <div className="space-y-3">
                    {historyItems.map((item) => (
                        <Link href={item.href} key={item.title}>
                            <motion.div
                            className="flex items-center gap-4 p-3 rounded-2xl bg-background/30 transition-colors hover:bg-muted/40"
                            whileTap={{ scale: 0.98 }}
                            >
                                <div className="p-3 bg-muted rounded-full">
                                    <item.icon className="w-5 h-5 text-foreground" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {item.time}
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
        <AppFooter />
    </div>
  );
}
