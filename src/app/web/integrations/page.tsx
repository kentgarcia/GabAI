
'use client';

import {
    MoreHorizontal,
    Store,
    CreditCard,
    Landmark,
    Plus,
    RefreshCw,
    Trash2,
    CheckCircle2,
    Link as LinkIcon
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const activeConnections = [
    {
        name: 'My Shopee Store',
        icon: Store,
        lastSynced: '5 minutes ago',
    },
];

const availableConnections = {
    'E-commerce': [
        { name: 'Lazada', icon: Store },
        { name: 'TikTok Shop', icon: Store },
        { name: 'Shopify', icon: Store },
    ],
    'Payment Gateways & E-wallets': [
        { name: 'GCash', icon: CreditCard },
        { name: 'Maya', icon: CreditCard },
        { name: 'PayPal', icon: CreditCard },
        { name: 'PayMongo', icon: CreditCard },
    ],
};

const ConnectionCard = ({ name, icon: Icon, children }: { name: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-muted rounded-lg">
                <Icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle className="flex-grow">{name}</CardTitle>
            {children}
        </CardHeader>
    </Card>
);

export default function IntegrationsHubPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Integrations & Connections</h1>
                <p className="text-muted-foreground">Automate your bookkeeping by connecting your accounts. GabAI will sync your data securely.</p>
            </header>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">Your Active Connections</h2>
                {activeConnections.map(conn => (
                    <ConnectionCard key={conn.name} name={conn.name} icon={conn.icon}>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-500 gap-1.5 pl-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Connected
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">Last synced: {conn.lastSynced}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" /> Refresh Sync</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Disconnect</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </ConnectionCard>
                ))}
            </section>

            <Separator />

            <section className="space-y-4">
                <h2 className="text-xl font-bold">Available Connections</h2>

                {Object.entries(availableConnections).map(([category, connections]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {connections.map(conn => (
                                <ConnectionCard key={conn.name} name={conn.name} icon={conn.icon}>
                                    <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Connect</Button>
                                </ConnectionCard>
                            ))}
                        </div>
                    </div>
                ))}

                 <div>
                    <h3 className="text-lg font-semibold mb-3">Bank Accounts</h3>
                     <Card>
                        <CardHeader>
                             <CardTitle>Secure Bank Sync</CardTitle>
                             <CardDescription>We partner with trusted open banking providers to securely connect your bank accounts with read-only access. Your credentials are never stored by GabAI.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button><LinkIcon className="mr-2 h-4 w-4" /> Connect a Bank Account</Button>
                        </CardContent>
                    </Card>
                </div>

            </section>
        </div>
    );
}
