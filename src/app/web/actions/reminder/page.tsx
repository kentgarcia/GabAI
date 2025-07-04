
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { BellRing } from 'lucide-react';

export default function ScheduleReminderPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [reminderType, setReminderType] = useState('');
    const [date, setDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [time, setTime] = useState('09:00');

    const isFormValid = reminderType && date && time;

    const handleSetReminder = () => {
        toast({
            title: `✅ Reminder Set!`,
            description: `We'll remind you about your ${reminderType} on ${date}.`,
        });
        router.push('/web');
    };

    const renderFormFields = () => {
        switch(reminderType) {
            case 'Tax Deadline':
                return (
                    <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Select a tax type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="itr-q3">Quarterly ITR (Q3 2024)</SelectItem>
                            <SelectItem value="percentage-q3">Quarterly Percentage Tax (Q3 2024)</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case 'Restock Product':
                return (
                    <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Select a product" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="prod-1">Vintage T-Shirt</SelectItem>
                            <SelectItem value="prod-2">Gadget Pro Stand</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case 'Invoice Follow-up':
                 return (
                    <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Select an invoice" /></SelectTrigger>
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
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Schedule a Reminder</CardTitle>
                <CardDescription>Set up smart alerts for important tasks and deadlines so you never miss a thing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="reminderType">Reminder Type</Label>
                    <Select value={reminderType} onValueChange={setReminderType}>
                        <SelectTrigger className="h-12"><SelectValue placeholder="What do you want to be reminded about?" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tax Deadline">Tax Deadline</SelectItem>
                            <SelectItem value="Restock Product">Restock Product</SelectItem>
                            <SelectItem value="Invoice Follow-up">Invoice Follow-up</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 
                {reminderType && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                        <div className="space-y-2">
                           <Label>{reminderType} Details</Label>
                           {renderFormFields()}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="h-12" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                           <Label>Notify me via</Label>
                           <div className="flex items-center gap-6 pt-2">
                               <div className="flex items-center space-x-2"><Checkbox id="in-app" defaultChecked /><Label htmlFor="in-app">In-app notification</Label></div>
                               <div className="flex items-center space-x-2"><Checkbox id="email" defaultChecked /><Label htmlFor="email">Email</Label></div>
                           </div>
                        </div>
                    </div>
                )}
                
                <Button onClick={handleSetReminder} disabled={!isFormValid} size="lg" className="w-full">
                    <BellRing className="mr-2" /> Set Reminder
                </Button>
            </CardContent>
        </Card>
    );
}
