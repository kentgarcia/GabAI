
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    Link as LinkIcon,
    Loader2,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Store,
    CreditCard,
    Trash2,
    Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const activeConnectionsMock = [
    { name: 'My Shopee Store', icon: Store, lastSynced: '5 minutes ago', status: 'connected' },
    { name: 'My GCash Account', icon: CreditCard, lastSynced: '1 hour ago', status: 'connected' },
];

const availableConnectionsMock = {
    'E-commerce Platforms': [
        { name: 'Lazada', icon: Store },
        { name: 'TikTok Shop', icon: Store },
        { name: 'Shopify', icon: Store },
    ],
    'E-wallets & Payment Gateways': [
        { name: 'Maya', icon: CreditCard },
        { name: 'PayPal', icon: CreditCard },
    ],
    'Bank Accounts': [
        { name: 'BDO Unibank', icon: Landmark },
        { name: 'Bank of the Philippine Islands', icon: Landmark },
    ]
};

const ConnectionCard = ({ name, icon: Icon, children }: { name: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Card className="bg-background/40 backdrop-blur-lg border-border/10">
        <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-black rounded-xl">
                <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-grow font-semibold">{name}</div>
            {children}
        </CardContent>
    </Card>
);

export default function IntegrationsPage() {
    const [connections, setConnections] = useState(activeConnectionsMock);

    const handleDisconnect = (name: string) => {
        setConnections(prev => prev.filter(c => c.name !== name));
    }

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.header initial="hidden" animate="visible" variants={itemVariants} className="flex items-center gap-2 mb-8">
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Integrations & Connections</h1>
            </motion.header>

            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
                    <motion.section variants={itemVariants} className="space-y-4">
                        <h2 className="text-lg font-bold">Active Connections ({connections.length})</h2>
                        {connections.length > 0 ? (
                            connections.map(conn => (
                                <ConnectionCard key={conn.name} name={conn.name} icon={conn.icon}>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Connected</p>
                                            <p className="text-xs text-muted-foreground mt-1">Last synced: {conn.lastSynced}</p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md border">
                                                <DropdownMenuItem><RefreshCw className="mr-2" /> Refresh Sync</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDisconnect(conn.name)} className="text-red-500"><Trash2 className="mr-2" /> Disconnect</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </ConnectionCard>
                            ))
                        ) : (
                            <p className="text-muted-foreground text-sm">You have no active connections.</p>
                        )}
                    </motion.section>

                    <Separator />

                    <motion.section variants={itemVariants} className="space-y-4">
                        <h2 className="text-lg font-bold">Available Connections</h2>
                        {Object.entries(availableConnectionsMock).map(([category, available]) => (
                            <div key={category} className="space-y-3">
                                <h3 className="font-semibold">{category}</h3>
                                {available.map(conn => (
                                    <ConnectionCard key={conn.name} name={conn.name} icon={conn.icon}>
                                        <Button variant="outline"><LinkIcon className="mr-2" /> Connect</Button>
                                    </ConnectionCard>
                                ))}
                            </div>
                        ))}
                    </motion.section>
                </motion.div>
            </div>
        </main>
    );
}
