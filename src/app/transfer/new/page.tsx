'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Banknote, Landmark, Wallet, Check, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';


const wallets = [
    { name: 'GCash', icon: Wallet, balance: '₱15,230.50' },
    { name: 'BDO Account', icon: Landmark, balance: '₱150,832.10' },
    { name: 'Cash On Hand', icon: Banknote, balance: '₱5,000.00' },
];

export default function RecordTransferPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [fromWallet, setFromWallet] = useState<string | null>(null);
    const [toWallet, setToWallet] = useState<string | null>(null);
    const [amount, setAmount] = useState('');

    const isFormValid = fromWallet && toWallet && amount && fromWallet !== toWallet;
    
    const handleRecordTransfer = () => {
        toast({
            title: `✅ Transfer Recorded!`,
            description: `Transfer of ₱${amount} from ${fromWallet} to ${toWallet} has been saved.`,
        });
        router.push('/dashboard');
    };

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
             <header className="flex items-center gap-2 mb-4 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Record a Transfer</h1>
            </header>
            
            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                        <Image src="/gabi-avatar.png" width={32} height={32} alt="Gabi" className="rounded-full flex-shrink-0" data-ai-hint="robot assistant" />
                        <p><span className="font-semibold text-foreground/80">Gabi's Tip:</span> Recording transfers helps keep your wallet balances accurate without affecting your income or expense reports.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>From</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {wallets.map(w => (
                                <Card key={w.name} onClick={() => setFromWallet(w.name)} className={cn(
                                    "p-3 flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer transition-all",
                                    fromWallet === w.name ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-muted/40 hover:bg-muted"
                                )}>
                                    <w.icon className="w-6 h-6" />
                                    <p className="font-semibold text-center text-xs">{w.name}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <ArrowDown className="w-8 h-8 text-muted-foreground" />
                    </div>

                     <div className="space-y-2">
                        <Label>To</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {wallets.map(w => (
                                <Card key={w.name} onClick={() => setToWallet(w.name)} className={cn(
                                    "p-3 flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer transition-all",
                                    toWallet === w.name ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-muted/40 hover:bg-muted"
                                )}>
                                    <w.icon className="w-6 h-6" />
                                    <p className="font-semibold text-center text-xs">{w.name}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                        <Label htmlFor="amount">Amount (PHP)</Label>
                        <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-background/30 h-14 text-2xl" />
                    </div>
                </motion.div>
            </div>


            <div className="pt-8">
                <Button onClick={handleRecordTransfer} disabled={!isFormValid} className="w-full bg-black text-white rounded-full h-14">
                    <Check className="mr-2" /> Record Transfer
                </Button>
            </div>
        </main>
    );
}