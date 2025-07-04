
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Repeat } from 'lucide-react';

export default function AddRecurringPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    expenseName: '',
    amount: '',
    category: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: 'category' | 'frequency', value: string) => {
    setFormData(prev => ({...prev, [id]: value}));
  };

  const isFormValid = formData.expenseName && formData.amount && formData.category && formData.frequency && formData.startDate;

  const handleSave = () => {
    toast({
      title: `✅ Recurring Expense Saved!`,
      description: `${formData.expenseName} will now be automatically logged ${formData.frequency}.`,
    });
    router.push('/web');
  };

  return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Add a Recurring Expense</CardTitle>
            <CardDescription>Automate logging for subscriptions and other regular payments to save time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="expenseName">Expense Name</Label>
                <Input id="expenseName" placeholder="e.g., Canva Pro Subscription" value={formData.expenseName} onChange={handleInputChange} className="h-12" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="amount">Amount (PHP)</Label>
                <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={handleInputChange} className="h-12" />
            </div>
            <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(val) => handleSelectChange('category', val)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="software">Software & Subs</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select onValueChange={(val) => handleSelectChange('frequency', val)}>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="startDate">First Payment Date</Label>
                    <Input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} className="h-12" />
                </div>
            </div>
            <Button onClick={handleSave} disabled={!isFormValid} size="lg" className="w-full">
                <Repeat className="mr-2" /> Save Recurring Expense
            </Button>
        </CardContent>
    </Card>
  );
}
