
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Check } from 'lucide-react';

export default function RecordTransferPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [fromWallet, setFromWallet] = useState('');
    const [toWallet, setToWallet] = useState('');
    const [amount, setAmount] = useState('');

    const isFormValid = fromWallet && toWallet && amount && fromWallet !== toWallet;
    
    const handleRecordTransfer = () => {
        toast({
            title: `✅ Transfer Recorded!`,
            description: `Transfer of ₱${amount} from ${fromWallet} to ${toWallet} has been saved.`,
        });
        router.push('/web');
    };

    const wallets = ['GCash', 'BDO Account', 'Cash On Hand', 'Maya', 'Wise'];

    return (
        <Card className="max-w-2xl mx-auto">
             <CardHeader>
                <CardTitle>Record a Fund Transfer</CardTitle>
                <CardDescription>Log movements between your wallets and bank accounts. This won't affect your income or expense totals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
                    <div className="space-y-2">
                        <Label>From</Label>
                        <Select value={fromWallet} onValueChange={setFromWallet}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Select source" /></SelectTrigger>
                            <SelectContent>
                                {wallets.map(w => <SelectItem key={w} value={w} disabled={w === toWallet}>{w}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex justify-center">
                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <Label>To</Label>
                         <Select value={toWallet} onValueChange={setToWallet}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Select destination" /></SelectTrigger>
                            <SelectContent>
                               {wallets.map(w => <SelectItem key={w} value={w} disabled={w === fromWallet}>{w}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="amount">Amount (PHP)</Label>
                    <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-12 text-lg" />
                </div>
                 <Button onClick={handleRecordTransfer} disabled={!isFormValid} size="lg" className="w-full">
                    <Check className="mr-2" /> Record Transfer
                </Button>
            </CardContent>
        </Card>
    );
}
