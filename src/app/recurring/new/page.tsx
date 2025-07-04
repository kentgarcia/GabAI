'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Repeat, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    router.push('/dashboard');
  };

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
      <header className="flex items-center gap-2 mb-8 -ml-2">
        <Button asChild variant="ghost" size="icon">
          <Link href="/add">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Recurring Expense</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6 space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="expenseName">Expense Name</Label>
          <Input id="expenseName" placeholder="e.g., Canva Pro Subscription" value={formData.expenseName} onChange={handleInputChange} className="bg-background/30 h-12" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="amount">Amount (PHP)</Label>
            <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={handleInputChange} className="bg-background/30 h-12" />
        </div>
        <div className="space-y-2">
            <Label>Category</Label>
             <Select onValueChange={(val) => handleSelectChange('category', val)}>
                <SelectTrigger className="w-full bg-background/30 h-12">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
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
                    <SelectTrigger className="w-full bg-background/30 h-12">
                        <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="startDate">First Payment Date</Label>
                <Input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} className="bg-background/30 h-12" />
            </div>
        </div>
      </motion.div>

      <div className="pt-8">
        <Button onClick={handleSave} disabled={!isFormValid} className="w-full bg-black text-white rounded-full h-14">
          <Repeat className="mr-2" /> Save Recurring Expense
        </Button>
      </div>
    </main>
  );
}