'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Check, Copy, Share2, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const paymentMethods = [
    { id: 'gcash', name: 'GCash' },
    { id: 'maya', name: 'Maya' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'wise', name: 'Wise' },
];

const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(numValue);
};

export default function CreatePaymentLinkPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerateLink = () => {
        if (!amount) {
            toast({
                title: "Amount is required",
                description: "Please enter an amount for the payment link.",
                variant: 'destructive'
            });
            return;
        }
        const link = `https://gab.ai/pay/${Math.random().toString(36).substring(2, 10)}`;
        setGeneratedLink(link);
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        toast({ title: '✅ Copied to clipboard!' });
    };

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
             <header className="flex items-center gap-2 mb-8 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Create Payment Link</h1>
            </header>
            
            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                 >
                    {generatedLink ? (
                        <div className="space-y-4 text-center">
                            <Check className="w-16 h-16 mx-auto text-emerald-500 bg-emerald-500/10 p-3 rounded-full" />
                            <h2 className="text-xl font-semibold">Link Generated!</h2>
                             <Card className="bg-background/40">
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Share this link to get paid:</p>
                                    <Input readOnly value={generatedLink} className="bg-muted mt-2 text-center font-mono" />
                                </CardContent>
                             </Card>
                            <div className="flex gap-3">
                                <Button onClick={handleCopy} className="w-full"><Copy className="mr-2"/> Copy Link</Button>
                                <Button variant="outline" className="w-full"><Share2 className="mr-2"/> Share</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (PHP)</Label>
                                <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-background/30 h-14 text-2xl" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Input id="description" placeholder="e.g., For Branding Project" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background/30 h-12" />
                            </div>

                            <div className="space-y-4">
                                <Label>Accepted Payment Methods</Label>
                                <div className="grid grid-cols-2 gap-3">
                                {paymentMethods.map(method => (
                                     <div key={method.id} className="flex items-center gap-3 p-3 border rounded-md bg-background/30">
                                        <Checkbox id={method.id} defaultChecked />
                                        <CreditCard className="w-6 h-6 text-muted-foreground" />
                                        <Label htmlFor={method.id} className="font-semibold">{method.name}</Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
            
            {!generatedLink && (
                <div className="pt-8">
                    <Button onClick={handleGenerateLink} className="w-full bg-black text-white rounded-full h-14">
                        Generate Link
                    </Button>
                </div>
            )}
        </main>
    );
}