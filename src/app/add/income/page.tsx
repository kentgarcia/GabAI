'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from "date-fns"
import { ArrowLeft, Check, ChevronRight, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const steps = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'Review' },
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


export default function AddIncomePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        amount: '',
        client: '',
        date: new Date(),
        description: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleNext = () => setStep(prev => Math.min(prev + 1, 2));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleConfirm = () => {
        toast({
            title: `✅ Income Logged!`,
            description: `${formatCurrency(formData.amount)} from ${formData.client} has been saved.`,
        });
        router.push('/dashboard');
    };
    
    const handleCreateReceipt = () => {
        toast({
            title: `✅ Income Logged!`,
            description: `${formatCurrency(formData.amount)} from ${formData.client} has been saved.`,
        });
        const query = new URLSearchParams({
            name: formData.client,
            value: formData.amount,
            date: formData.date.toISOString(),
            project: formData.description || 'N/A',
        });
        router.push(`/receipt/preview?${query.toString()}`);
    }

    const isStep1Valid = formData.amount && formData.client && formData.date;

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
             <header className="flex items-center gap-2 mb-4 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Log Income</h1>
            </header>
            
            <Stepper currentStep={step} />

            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                        <h2 className="text-xl font-semibold">Log Your Income</h2>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (PHP)</Label>
                            <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={handleInputChange} className="bg-background/30 h-14 text-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client">Source / From Client</Label>
                            <Input id="client" placeholder="e.g., Innovate Corp" value={formData.client} onChange={handleInputChange} className="bg-background/30 h-12" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Date Received</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal bg-background/30 backdrop-blur-md border h-12",
                                    !formData.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-background/80 backdrop-blur-md border">
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => setFormData(prev => ({...prev, date: date || new Date()}))}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input id="description" placeholder="e.g., Graphic Design Project, Phase 2" value={formData.description} onChange={handleInputChange} className="bg-background/30 h-12" />
                        </div>
                    </motion.div>
                )}
                 {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                        <h2 className="text-xl font-semibold">Confirm Income</h2>
                        <Card className="bg-background/30">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-muted-foreground">Amount:</p>
                                    <p className="text-2xl font-bold">{formatCurrency(formData.amount)}</p>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">From:</p>
                                    <p className="font-semibold">{formData.client}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Date:</p>
                                    <p className="font-semibold">{format(formData.date, "PPP")}</p>
                                </div>
                                {formData.description && (
                                    <div className="flex justify-between items-center">
                                        <p className="text-muted-foreground">Description:</p>
                                        <p className="font-semibold">{formData.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        <Button variant="outline" className="w-full bg-background/30" onClick={handleCreateReceipt}>
                            <FileText className="mr-2" /> Create & Log Receipt
                        </Button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>


            <div className="pt-8 flex flex-col gap-3">
                {step === 2 && (
                    <Button className="w-full bg-emerald-600 text-white rounded-full h-14" onClick={handleConfirm}>
                        Confirm & Log Income
                    </Button>
                )}
                {step < 2 && (
                    <Button className="w-full bg-black text-white rounded-full h-14" onClick={handleNext} disabled={!isStep1Valid}>
                        Next <ChevronRight className="ml-2" />
                    </Button>
                )}
                 {step > 1 && (
                    <Button variant="ghost" className="w-full rounded-full h-14" onClick={handleBack}>
                        Back
                    </Button>
                )}
            </div>
        </main>
    );
}
