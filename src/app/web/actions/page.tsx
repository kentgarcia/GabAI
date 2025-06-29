'use client';

import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Camera, FileText, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const actions = [
  { href: "/web/actions/log", icon: ArrowUp, title: "Log Income", description: "Quickly add a payment from a client or a manual sale." },
  { href: "/web/actions/log", icon: ArrowDown, title: "Log Expense", description: "Record a business expense to keep your books accurate." },
  { href: "/web/actions/upload", icon: Camera, title: "Scan & Upload Receipts", description: "Upload multiple receipts or documents at once for Gabi to process." },
  { href: "/web/actions/invoice/new", icon: FileText, title: "Create an Invoice", description: "Bill a client with a professional, trackable invoice." },
  { href: "/web/actions/payment-link", icon: LinkIcon, title: "Generate a Payment Link", description: "Create a secure link to accept card payments.", isPro: true },
];

export default function ActionsHubPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">What would you like to create?</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map(action => (
                    <Link href={action.isPro ? "#" : action.href} key={action.title}>
                        <Card className="h-full hover:border-primary transition-all hover:shadow-lg bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <action.icon className="w-8 h-8 mb-4 text-primary" />
                                    {action.isPro && <Badge variant="secondary" className="bg-primary/20 text-primary">✨ Pro</Badge>}
                                </div>
                                <CardTitle>{action.title}</CardTitle>
                                <CardDescription>{action.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
