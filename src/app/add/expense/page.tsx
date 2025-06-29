'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Check, ChevronRight, ShoppingBag, Truck, Laptop, Megaphone, Wrench, Camera, Lightbulb, Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'Category' },
  { id: 3, name: 'Review' },
];

const categories = [
    { name: 'Product Costs', icon: ShoppingBag, suggestion: "Based on vendor 'Supplier'" },
    { name: 'Shipping & Fees', icon: Truck, suggestion: "Based on vendor 'LBC'"},
    { name: 'Software & Subs', icon: Laptop, suggestion: "Based on vendor 'Canva'" },
    { name: 'Marketing & Ads', icon: Megaphone, suggestion: "Based on vendor 'Facebook Ads'"},
    { name: 'Utilities', icon: Wrench, suggestion: "Based on vendor 'Meralco'"},
];

const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(numValue);
};

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors',
                currentStep > step.id ? 'bg-primary text-primary-foreground' :
                currentStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span className={cn(
                'font-semibold',
                 currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
            )}>{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};


export default function AddExpensePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        amount: '',
        vendor: '',
        date: new Date().toISOString().split('T')[0], // Default to today in YYYY-MM-DD
        category: '',
        description: '',
        receipt: null as File | null,
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    }

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleConfirm = () => {
        toast({
            title: `✅ Expense Logged!`,
            description: `${formatCurrency(formData.amount)} for ${formData.vendor} has been saved.`,
        });
        router.push('/dashboard');
    };

    const isStep1Valid = formData.amount && formData.vendor && formData.date;
    const isStep2Valid = formData.category !== '';

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
             <header className="flex items-center gap-2 mb-4 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Log an Expense</h1>
            </header>
            
            <Stepper currentStep={step} />

            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                        <h2 className="text-xl font-semibold">Enter the Details</h2>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (PHP)</Label>
                            <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={handleInputChange} className="bg-background/30 h-14 text-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vendor">Vendor / Paid To</Label>
                            <Input id="vendor" placeholder="e.g., Canva, Shopee, Meralco" value={formData.vendor} onChange={handleInputChange} className="bg-background/30 h-12" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Date Paid</Label>
                            <Input id="date" type="date" value={formData.date} onChange={handleInputChange} className="bg-background/30 h-12" />
                        </div>
                    </motion.div>
                )}
                 {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                        <h2 className="text-xl font-semibold">Categorize Your Expense</h2>
                        
                        {formData.vendor && (
                            <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                                <Bot className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                                <p><span className="font-semibold text-foreground/80">Gabi suggests:</span> I see you entered '{formData.vendor}'. I can categorize this under <span className="font-bold">Software & Subs</span> for you.</p>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map(cat => (
                                <Card key={cat.name} onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))} className={cn(
                                    "p-4 flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer transition-all",
                                    formData.category === cat.name ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-muted/40 hover:bg-muted"
                                )}>
                                    <cat.icon className="w-8 h-8" />
                                    <p className="font-semibold text-center text-sm">{cat.name}</p>
                                </Card>
                            ))}
                        </div>
                        <Button variant="link" className="w-full">+ Add New Category</Button>
                    </motion.div>
                )}
                 {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                        <h2 className="text-xl font-semibold">Review & Save</h2>
                        <Card className="bg-background/30">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-muted-foreground">Amount:</p>
                                    <p className="text-2xl font-bold">{formatCurrency(formData.amount)}</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Vendor:</p>
                                    <p className="font-semibold">{formData.vendor}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Date:</p>
                                    <p className="font-semibold">{new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Category:</p>
                                    <p className="font-semibold">{formData.category}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input id="description" placeholder="e.g., For social media templates" value={formData.description} onChange={handleInputChange} className="bg-background/30" />
                        </div>
                        <div>
                            <Button variant="outline" className="w-full bg-background/30">
                                <Camera className="mr-2" /> Attach Receipt
                            </Button>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>


            <div className="pt-8 flex gap-3">
                {step > 1 && (
                    <Button variant="outline" className="w-full rounded-full h-14" onClick={handleBack}>
                        Back
                    </Button>
                )}
                {step < 3 && (
                    <Button className="w-full bg-black text-white rounded-full h-14" onClick={handleNext} disabled={step === 1 ? !isStep1Valid : !isStep2Valid}>
                        Next <ChevronRight className="ml-2" />
                    </Button>
                )}
                {step === 3 && (
                    <Button className="w-full bg-black text-white rounded-full h-14" onClick={handleConfirm}>
                        Confirm & Log Expense
                    </Button>
                )}
            </div>
        </main>
    );
}
