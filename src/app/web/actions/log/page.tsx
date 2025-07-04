
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ArrowUp, ArrowDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(numValue);
};

const IncomeForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        amount: '',
        client: '',
        date: new Date(),
        description: '',
    });

    const isFormValid = formData.amount && formData.client && formData.date;

    const handleSubmit = () => {
        toast({
            title: `✅ Income Logged!`,
            description: `${formatCurrency(formData.amount)} from ${formData.client} has been saved.`,
        });
        router.push('/web');
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="incomeAmount">Amount (PHP)</Label>
                <Input id="incomeAmount" type="number" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} className="h-12 text-lg" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="client">Source / From Client</Label>
                <Input id="client" placeholder="e.g., Innovate Corp" value={formData.client} onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))} className="h-12" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Date Received</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-12", !formData.date && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.date} onSelect={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
                <Label htmlFor="incomeDescription">Description (Optional)</Label>
                <Input id="incomeDescription" placeholder="e.g., Graphic Design Project, Phase 2" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="h-12" />
            </div>
            <Button onClick={handleSubmit} disabled={!isFormValid} size="lg" className="w-full">Log Income</Button>
        </div>
    );
};

const ExpenseForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        amount: '',
        vendor: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        description: '',
    });

    const isFormValid = formData.amount && formData.vendor && formData.date && formData.category;

    const handleSubmit = () => {
        toast({
            title: `✅ Expense Logged!`,
            description: `${formatCurrency(formData.amount)} for ${formData.vendor} has been saved.`,
        });
        router.push('/web');
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="expenseAmount">Amount (PHP)</Label>
                <Input id="expenseAmount" type="number" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} className="h-12 text-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor / Paid To</Label>
                    <Input id="vendor" placeholder="e.g., Canva, Meralco" value={formData.vendor} onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))} className="h-12" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="expenseDate">Date Paid</Label>
                    <Input id="expenseDate" type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} className="h-12" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                 <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="product-costs">Product Costs</SelectItem>
                        <SelectItem value="shipping-fees">Shipping & Fees</SelectItem>
                        <SelectItem value="software-subs">Software & Subs</SelectItem>
                        <SelectItem value="marketing-ads">Marketing & Ads</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="expenseDescription">Description (Optional)</Label>
                <Input id="expenseDescription" placeholder="e.g., For social media templates" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="h-12" />
            </div>
            <Button onClick={handleSubmit} disabled={!isFormValid} size="lg" className="w-full">Log Expense</Button>
        </div>
    );
}

export default function LogTransactionPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Log a Transaction</CardTitle>
                    <CardDescription>
                        Use the tabs to switch between logging an income or an expense.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="income" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="income"><ArrowUp className="mr-2 text-emerald-500" /> Income</TabsTrigger>
                            <TabsTrigger value="expense"><ArrowDown className="mr-2 text-red-500" /> Expense</TabsTrigger>
                        </TabsList>
                        <TabsContent value="income" className="pt-6">
                            <IncomeForm />
                        </TabsContent>
                        <TabsContent value="expense" className="pt-6">
                            <ExpenseForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
