'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BellRing, Check, Landmark, ShoppingBag, FileText, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const reminderTypes = [
    { name: 'Tax Deadline', icon: Landmark, description: "Reminders for BIR payments." },
    { name: 'Restock Product', icon: ShoppingBag, description: "Alerts to re-order inventory." },
    { name: 'Invoice Follow-up', icon: FileText, description: "Nudges to check on unpaid invoices." },
];

export default function ScheduleReminderPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [date, setDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [time, setTime] = useState('09:00');

    const isFormValid = selectedType && date && time;

    const handleSetReminder = () => {
        toast({
            title: `✅ Reminder Set!`,
            description: `We'll remind you about your ${selectedType} on ${date}.`,
        });
        router.push('/dashboard');
    };

    const renderFormFields = () => {
        switch(selectedType) {
            case 'Tax Deadline':
                return (
                    <Select>
                        <SelectTrigger className="bg-background/30 h-12"><SelectValue placeholder="Select a tax type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="itr-q3">Quarterly ITR (Q3 2024)</SelectItem>
                            <SelectItem value="percentage-q3">Quarterly Percentage Tax (Q3 2024)</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case 'Restock Product':
                return (
                    <Select>
                        <SelectTrigger className="bg-background/30 h-12"><SelectValue placeholder="Select a product" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="prod-1">Vintage T-Shirt</SelectItem>
                            <SelectItem value="prod-2">Gadget Pro Stand</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case 'Invoice Follow-up':
                 return (
                    <Select>
                        <SelectTrigger className="bg-background/30 h-12"><SelectValue placeholder="Select an invoice" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inv-1">INV-003 (Creative Minds Co.) - Overdue</SelectItem>
                            <SelectItem value="inv-2">INV-004 (Global Ventures) - Due in 10 days</SelectItem>
                        </SelectContent>
                    </Select>
                );
            default:
                return null;
        }
    }

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <header className="flex items-center gap-2 mb-8 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Schedule Reminder</h1>
            </header>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6 space-y-6">
                 <div>
                    <Label>What do you want to be reminded about?</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {reminderTypes.map(type => (
                            <Card key={type.name} onClick={() => setSelectedType(type.name)} className={cn(
                                "p-3 flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer transition-all",
                                selectedType === type.name ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-muted/40 hover:bg-muted"
                            )}>
                                <type.icon className="w-6 h-6" />
                                <p className="font-semibold text-center text-xs">{type.name}</p>
                            </Card>
                        ))}
                    </div>
                 </div>

                {selectedType && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="space-y-2">
                           <Label>{selectedType} Details</Label>
                           {renderFormFields()}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-background/30 h-12" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="bg-background/30 h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                           <Label>Notify me via</Label>
                           <div className="flex flex-col gap-3">
                               <div className="flex items-center space-x-2"><Checkbox id="in-app" defaultChecked /><Label htmlFor="in-app">In-app notification</Label></div>
                               <div className="flex items-center space-x-2"><Checkbox id="email" defaultChecked /><Label htmlFor="email">Email</Label></div>
                           </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className="pt-8">
                <Button onClick={handleSetReminder} disabled={!isFormValid} className="w-full bg-black text-white rounded-full h-14">
                    <BellRing className="mr-2" /> Set Reminder
                </Button>
            </div>
        </main>
    );
}